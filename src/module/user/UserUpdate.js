import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import styled from "styled-components";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import Form from "../../components/form/Form";
import { IconEyeClose, IconEyeOpen } from "../../components/icons";
import ImageUpload from "../../components/input/ImageUpload";
import Input from "../../components/input/Input";
import InputTogglePassword from "../../components/input/InputTogglePassword";
import Radio from "../../components/input/Radio";
import Label from "../../components/label/Label";
import Textarea from "../../components/textarea";

import { db } from "../../firebase/firebase-config";
import useFribaseImage from "../../hooks/useFribaseImage";
import PageNotfould from "../../pages/PageNotfould";
import { ROUTERLINK } from "../../router/Router";
import {
  FIREBASE_COLLECTION,
  ROLE,
  SLUG_SLUGIFY,
  TOAST_TYPE,
  USER_STATUS,
} from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";

const UserUpdateStyled = styled.div`
  .form-control {
    max-width: 100%;
  }
`;

const avatarDefault =
  "https://kucuklerocakbasi.com.tr/themes/tastyigniter-orange/assets/avatar.png";

const UserUpdate = () => {
  const {
    handleSubmit,
    getValues,
    control,
    setValue,
    formState: { isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      avatar: avatarDefault,
    },
  });

  const regexNameAvata = useRef(/%2F(\S+)\?/).current;
  const nameAvata = !!getValues("image_name") ? getValues("image_name") : "";
  const { handleRemoveImage, handleSelectImage, imgDone, progressImage } =
    useFribaseImage(setValue, getValues, nameAvata, deleteAvatarDoc);

  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  const idUser = searchParam.get("id");
  const docRef = useRef(doc(db, FIREBASE_COLLECTION.USER, idUser)).current;

  const watchStatus = Number(watch("status"));
  const watchRole = Number(watch("role"));

  async function deleteAvatarDoc() {
    await updateDoc(docRef, {
      avatar: avatarDefault,
    });
    setValue("image", avatarDefault);
  }

  const onSubmit = async (values) => {
    const newValue = { ...values };
    newValue.role = Number(newValue.role);
    newValue.status = Number(newValue.status);
    newValue.userName = slugify(
      newValue.userName || newValue.displayName,
      SLUG_SLUGIFY
    );
    if (!!newValue.image.length) {
      newValue.avatar = newValue.image;
    }
    if (newValue.image) delete newValue.image;
    try {
      await updateDoc(docRef, newValue);
      toast.success("Update user successfuly", TOAST_TYPE);
      navigate(ROUTERLINK.DASHBOARD_USER.path);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // get data
  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const user = snapshot.data();
      reset(user);

      if (user.avatar?.match(regexNameAvata)) {
        setValue("image", user.avatar);
      } else {
        setValue("image", "");
        setValue("avatar", avatarDefault);
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = "MonkeyBloging - User add new";
  }, []);

  if (!idUser) return <PageNotfould></PageNotfould>;

  return (
    <UserUpdateStyled>
      <DashboardHeading
        title="Update user"
        desc="Update user"
      ></DashboardHeading>
      <Form handle={handleSubmit(onSubmit)} className="form-control">
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
          <ImageUpload
            image={getValues("image")}
            onChange={handleSelectImage}
            onRemoveImage={handleRemoveImage}
            progress={progressImage}
            imageDone={imgDone}
            rounder="100%"
            height="100%"
          ></ImageUpload>
        </div>
        <div className="form-wrapper-layout">
          <Field>
            <Label htmlFor="displayName"> Fullname</Label>
            <Input
              control={control}
              placeholder="Enter your fullname"
              name="displayName"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="userName">User name</Label>
            <Input
              control={control}
              placeholder="Enter your user name"
              name="userName"
            ></Input>
          </Field>
        </div>
        <div className="form-wrapper-layout">
          <Field>
            <Label htmlFor="password"> PassWord</Label>
            <InputTogglePassword
              control={control}
              placeholder="Enter your password"
              name="password"
              iconShow={<IconEyeOpen />}
              iconHide={<IconEyeClose />}
            ></InputTogglePassword>
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              control={control}
              placeholder="Enter your Email Address"
              name="email"
            ></Input>
          </Field>
        </div>
        <div className="mb-10">
          <Textarea
            control={control}
            name="description"
            placeholder="Write something..."
          ></Textarea>
        </div>
        <div className="form-wrapper-layout">
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="flex flex-1 items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={watchStatus === USER_STATUS.ACTIVE}
                onClick={() => setValue("status", USER_STATUS.ACTIVE)}
                value={USER_STATUS.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === USER_STATUS.PENDING}
                onClick={() => setValue("status", USER_STATUS.PENDING)}
                value={USER_STATUS.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === USER_STATUS.BANNED}
                onClick={() => setValue("status", USER_STATUS.BANNED)}
                value={USER_STATUS.BANNED}
              >
                Banned
              </Radio>
            </div>
          </Field>
          <Field>
            {/* role */}
            <Label htmlFor="role">Role</Label>
            <div className="flex flex-1 items-center gap-x-5">
              <Radio
                name="role"
                control={control}
                checked={watchRole === ROLE.USER}
                onClick={() => setValue("role", ROLE.USER)}
                value={ROLE.USER}
              >
                User
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={watchRole === ROLE.ADMIN}
                onClick={() => setValue("role", ROLE.ADMIN)}
                value={ROLE.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={watchRole === ROLE.MODERATOR}
                onClick={() => setValue("role", ROLE.MODERATOR)}
                value={ROLE.MODERATOR}
              >
                Moderator
              </Radio>
            </div>
          </Field>
        </div>
        <Button isLoading={isSubmitting} type="submit" className="w-[250px]">
          Update post
        </Button>
      </Form>
    </UserUpdateStyled>
  );
};

export default UserUpdate;
