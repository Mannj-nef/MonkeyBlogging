import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import styled from "styled-components";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { Form } from "../../components/form";
import { Input, Radio } from "../../components/input";
import { Label } from "../../components/label";
import {
  CATEGORY_STATUS,
  FIREBASE_COLLECTION,
  SLUG_SLUGIFY,
  TOAST_TYPE,
} from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import { db } from "../../firebase/firebase-config";
import { toast } from "react-toastify";

const CategoryAddNewStyled = styled.div`
  .form-control {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const CategoryAddNew = () => {
  const { formState, handleSubmit, control, setValue, watch, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      time: new Date(),
    },
  });
  const { isSubmitting } = formState;
  const watchStatus = Number(watch("status"));

  const onSubmit = async (values) => {
    const newValues = { ...values };
    const colRef = collection(db, FIREBASE_COLLECTION.CATEGRORIES);

    newValues.slug = slugify(newValues.slug || newValues.title, SLUG_SLUGIFY);
    newValues.status = Number(newValues.status);

    try {
      await addDoc(colRef, {
        ...newValues,
        time: serverTimestamp(),
      });
      toast.success("Create new category successfully!", TOAST_TYPE);

      reset({
        title: "",
        slug: "",
        status: 2,
        time: new Date(),
      });
    } catch (error) {
      toast.error(error.message, TOAST_TYPE);
    }
  };

  useEffect(() => {
    document.title = "MonkeyBlogging - Add category";
  }, []);

  return (
    <CategoryAddNewStyled>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <Form handle={handleSubmit(onSubmit)} className="form-control">
        <div className="form-wrapper-layout">
          <Field>
            <Label htmlFor="title">Category Title</Label>
            <Input
              control={control}
              placeholder="Enter your category title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="form-wrapper-layout">
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="flex flex-1 items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={watchStatus === CATEGORY_STATUS.APPROVED}
                onClick={() => setValue("status", CATEGORY_STATUS.APPROVED)}
                value={CATEGORY_STATUS.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === CATEGORY_STATUS.UNAPPROVED}
                onClick={() => setValue("status", CATEGORY_STATUS.UNAPPROVED)}
                value={CATEGORY_STATUS.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button isLoading={isSubmitting} type="submit" className="w-[250px]">
          Add new post
        </Button>
      </Form>
    </CategoryAddNewStyled>
  );
};

export default CategoryAddNew;
