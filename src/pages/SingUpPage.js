import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputTogglePassword, Input } from "../components/input";
import { IconEyeClose, IconEyeOpen } from "../components/icons";
import { Button } from "../components/button";
import { Field } from "../components/field";
import { Label } from "../components/label";
import {
  FIREBASE_COLLECTION,
  ROLE,
  SLUG_SLUGIFY,
  TOAST_TYPE,
  USER_STATUS,
  VALIDATE_YUP,
} from "../utils/constants";
import ErrorsInput from "../components/errors/ErrorsInput";
import { auth, db } from "../firebase/firebase-config";
import AuthenPage from "./AuthenPage";
import { ROUTERLINK } from "../router/Router";
import Form from "../components/form/Form";
import slugify from "slugify";

const schema = Yup.object({
  fullname: VALIDATE_YUP.TEXT,
  email: VALIDATE_YUP.EMAIL,
  password: VALIDATE_YUP.PASSWORD,
});

const avatarImage =
  "https://kucuklerocakbasi.com.tr/themes/tastyigniter-orange/assets/avatar.png";

const SingUpPage = () => {
  // const colUserRef = collection(db, "user");
  const navigate = useNavigate();
  const { handleSubmit, formState, control } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors, isSubmitting } = formState;

  const handleSingUp = async (value) => {
    value.email = value.email.toLowerCase();
    const { fullname, email, password } = value;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: fullname,
        photoURL: avatarImage,
      });

      await setDoc(doc(db, FIREBASE_COLLECTION.USER, auth?.currentUser?.uid), {
        displayName: fullname,
        email,
        password,
        avatar: avatarImage,
        userName: slugify(fullname, SLUG_SLUGIFY),
        role: ROLE.USER,
        status: USER_STATUS.ACTIVE,
        time: serverTimestamp(),
      });

      toast.success("Sign Up Success!", TOAST_TYPE);
      navigate(ROUTERLINK.HOME.path);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    document.title = "Register Page";
  }, []);

  return (
    <AuthenPage>
      <Form handle={handleSubmit(handleSingUp)}>
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            name="fullname"
            placeholder="Please enter your fullname"
            control={control}
          ></Input>
          <ErrorsInput>{errors?.fullname?.message}</ErrorsInput>
        </Field>
        <Field>
          <Label htmlFor="email">Email Address</Label>
          <Input
            name="email"
            placeholder="Please enter your email"
            control={control}
          ></Input>
          <ErrorsInput>{errors?.email?.message}</ErrorsInput>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputTogglePassword
            placeholder="Please enter your password"
            control={control}
            iconShow={<IconEyeOpen />}
            iconHide={<IconEyeClose />}
          ></InputTogglePassword>
          <ErrorsInput>{errors?.password?.message}</ErrorsInput>
        </Field>
        <p className="have-account">
          You already have an account
          <NavLink to={`${ROUTERLINK.SING_IN.path}`}> Login</NavLink>
        </p>
        <Button
          type="submit"
          style={{ width: 300 }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
      </Form>
    </AuthenPage>
  );
};

export default SingUpPage;
