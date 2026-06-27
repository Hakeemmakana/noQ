// src/components/profile/ProfilePage.tsx
import { useEffect,  useState } from "react";
import { useDispatch } from "react-redux";
import type { FieldErrors, ProfileFormData, AdminProfile } from "../types/profileTypes";
import { validateProfileForm } from "../validation/profileValidation";
import { validatePasswordFlow } from "../validation/passwordValidation";
import {
  fetchProfile,
  requestPasswordOtp,
  requestResentOtp,
  resetPassword,
  updateProfile,
  uploadProfileImage,
  verifyPasswordOtp,
} from "../service/ProfileService";
import { errorToast, successToast } from "../../../../shared/utils/toastNotification";
import ProfileHeader from "../components/ProfileHeader";
import ProfileDetailsCard from "../components/ProfileDetailsCard";
import SecurityCard from "../components/SecurityCard";
import ImageUploadModal from "../components/ImageUploadModal";
import { setAdminImage, setAdminName } from "../../../auth/authSlice/adminAuthSlice";

type PasswordStep = "idle" | "otp" | "password";

const initialProfile: AdminProfile = {
  _id: "1",
  imageUrl: null,
  restaurantName: "",
  email: "",
  phone: "",
  location:'',
  fullAddress:''
};

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile>(initialProfile);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordMode, setIsPasswordMode] = useState(false);

  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    restaurantName: "",
    email: "",
    phone: "",
    location: "",
    fullAddress:""
  });

  const [profileErrors, setProfileErrors] = useState<FieldErrors>({});
  const [profileLoading, setProfileLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const [passwordStep, setPasswordStep] = useState<PasswordStep>("idle");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<FieldErrors>({});
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassToken, setResetPassToken] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const dispatch = useDispatch();
  // const displayedDob = useMemo(() => profile.dob ?? "", [profile.dob]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchProfile();
        setProfile(res);
        setProfileForm({
          restaurantName: res.restaurantName,
          email: res.email,
          phone: res.phone,
          fullAddress: res.fullAddress?? "",
          location:res.location
        });
        if (res.imageUrl) {
          setImagePreview(res.imageUrl);
          setProfilePic(res.imageUrl);
        }
      } catch (error) {
        errorToast((error as string) || "Something went wrong");
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const flaaagFalse=false

  const handleResendOtp = async () => {
    try {
      setTimeLeft(120);
      const res = await requestResentOtp(profile.email);
      setOtp("");
      setPasswordErrors((prev) => ({ ...prev, otp: undefined }));
      successToast(res.message);
    } catch (error) {
      errorToast(error as string);
    }
  };

  const handleOpenEdit = () => {
    setIsPasswordMode(false);
    setPasswordStep("idle");
    setPasswordErrors({});
    setProfileForm({
      restaurantName: profile.restaurantName,
      email: profile.email,
      phone: profile.phone,
      location: profile.location ?? "",
      fullAddress:profile.fullAddress
    });
    setProfileErrors({});
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setProfileErrors({});
    setProfileForm({
      restaurantName: profile.restaurantName,
      email: profile.email,
      phone: profile.phone,
      fullAddress: profile.fullAddress?? "",
      location:profile.location
    });
  };

  const handleOpenPassword = async () => {
    setIsEditMode(false);
    setPasswordStep("idle");
    setPasswordErrors({});
    setOtp("");
    setPassword("");
    setConfirmPassword("");

    setPasswordLoading(true);
    try {
      setTimeLeft(120);
      const res = await requestPasswordOtp(profile.email);
      setPasswordStep("otp");
      successToast(res.message);
      setIsPasswordMode(true);
    } catch (err) {
      errorToast(err as string);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleCancelPassword = () => {
    setIsPasswordMode(false);
    setPasswordStep("idle");
    setPasswordErrors({});
    setOtp("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleProfileChange = (key: keyof ProfileFormData, value: string) => {
    setProfileForm((prev) => ({ ...prev, [key]: value }));
    setProfileErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleProfileSubmit = async () => {
    const errors = validateProfileForm(profileForm);
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      console.log('errrors')
      return;
    }

    setProfileLoading(true);
    try {
      const update = await updateProfile({
        restaurantName: profileForm.restaurantName.trim(),
        phone: profileForm.phone.trim(),
        location:profileForm.location.trim(),
        fullAddress:profileForm.fullAddress.trim()
      });

      if (profile.restaurantName !== profileForm.restaurantName) {
        dispatch(setAdminName(profileForm.restaurantName.trim()));
      }

      setProfile((prev) => ({
        ...prev,
        restaurantName: profileForm.restaurantName.trim(),
        phone: profileForm.phone.trim(),
        location:profileForm.location.trim(),
        fullAddress:profileForm.fullAddress.trim()
      }));

      setIsEditMode(false);
      successToast(update.message);
    } catch (error) {
      errorToast((error as string) || "something went wrong");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleImageSelect = (file: File | null) => {
    if(!file?.type.startsWith('image/')){
      errorToast('Plese select image file only ')
      return 
    }
    setSelectedImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    setImageLoading(true);
    try {
      const res = await uploadProfileImage(selectedImage);
      setProfile((prev) => ({
        ...prev,
        imageUrl: res.data.imageUrl,
      }));
      setProfilePic(res.data.imageUrl);
      dispatch(setAdminImage(res.data.imageUrl));
      successToast(res.message);
      setShowImagePopup(false);
      setSelectedImage(null);
    } catch (error) {
      errorToast((error as string) || "something went wrong");
    } finally {
      setImageLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setPasswordErrors({ otp: "OTP is required" });
      return;
    }

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setPasswordErrors({ otp: "Enter a valid OTP" });
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await verifyPasswordOtp(profile.email, otp.trim());
      setResetPassToken(res.token);
      successToast(res.message);
      setPasswordStep("password");
    } catch (error) {
      errorToast(error as string);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    const errors = validatePasswordFlow(otp, password, confirmPassword);
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await resetPassword({
        token: resetPassToken,
        newPassword: confirmPassword,
      });

      setIsPasswordMode(false);
      setPasswordStep("idle");
      setResetPassToken("");
      setPassword("");
      setConfirmPassword("");
      successToast(res.message);
    } catch (error) {
      errorToast((error as string) || "something went wrong");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <ProfileHeader
            name={profile.restaurantName}
            profilePic={profilePic}
            onEditImage={() => setShowImagePopup(true)}
          />

          <div className="px-4 pb-6 sm:px-6">
            <ProfileDetailsCard
              isEditMode={isEditMode}
              isPasswordMode={isPasswordMode}
              profileForm={profileForm}
              profileErrors={profileErrors}
              profileLoading={profileLoading}
              onOpenEdit={handleOpenEdit}
              onCancelEdit={handleCancelEdit}
              onSubmit={handleProfileSubmit}
              onChange={handleProfileChange}
            />

     {flaaagFalse&&<SecurityCard
              isEditMode={isEditMode}
              isPasswordMode={isPasswordMode}
              passwordStep={passwordStep}
              passwordLoading={passwordLoading}
              passwordErrors={passwordErrors}
              otp={otp}
              password={password}
              confirmPassword={confirmPassword}
              timeLeft={timeLeft}
              onOpenPassword={handleOpenPassword}
              onCancelPassword={handleCancelPassword}
              onOtpChange={(value) => {
                setOtp(value);
                setPasswordErrors((prev) => ({ ...prev, otp: undefined }));
              }}
              onPasswordChange={(value) => {
                setPassword(value);
                setPasswordErrors((prev) => ({ ...prev, password: undefined }));
              }}
              onConfirmPasswordChange={(value) => {
                setConfirmPassword(value);
                setPasswordErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
              onVerifyOtp={handleVerifyOtp}
              onPasswordSubmit={handlePasswordSubmit}
              onResendOtp={handleResendOtp}
            />
}
          </div>
        </div>
      </div>

      <ImageUploadModal
        open={showImagePopup}
        imagePreview={imagePreview}
        profilePic={profilePic}
        selectedImage={selectedImage}
        imageLoading={imageLoading}
        onClose={() => {
          setShowImagePopup(false);
          setImagePreview(profilePic);
        }}
        onSelectImage={handleImageSelect}
        onSubmit={handleImageUpload}
      />
    </div>
  );
}