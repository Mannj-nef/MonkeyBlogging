import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { TOAST_TYPE, VALIDATE_YUP } from "../utils/constants";
import { Button } from "../components/button";
import ErrorsInput from "../components/errors/ErrorsInput";
import { Field } from "../components/field";
import { IconEyeClose, IconEyeOpen } from "../components/icons";
import { Input, InputTogglePassword } from "../components/input";
import { Label } from "../components/label";
import { auth } from "../firebase/firebase-config";
import AuthenPage from "./AuthenPage";
import { useAuthContext } from "../contexts/auth-context";
import { ROUTERLINK } from "../router/Router";
import Form from "../components/form/Form";

const schema = Yup.object({
  email: VALIDATE_YUP.EMAIL,
  password: VALIDATE_YUP.PASSWORD,
});

const SingInPage = () => {
  const { handleSubmit, formState, control } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors, isValid, isSubmitting } = formState;

  const navigate = useNavigate();
  const { handleSetUserInfo, userInfo } = useAuthContext();

  const handleSingIn = async (values) => {
    const { email, password } = values;
    if (!isValid) return;
    try {
      const authSign = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successful", TOAST_TYPE);
      handleSetUserInfo(authSign.user);
      navigate(ROUTERLINK.HOME.path);
    } catch (error) {
      toast.error("Login failed, wrong account or password", TOAST_TYPE);
      throw new Error(error);
    }
  };

  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) navigate(ROUTERLINK.HOME.path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <AuthenPage>
      <Form handle={handleSubmit(handleSingIn)}>
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
          Create a new account to
          <NavLink to={`${ROUTERLINK.SING_UP.path}`}> Register</NavLink>
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

export default SingInPage;
