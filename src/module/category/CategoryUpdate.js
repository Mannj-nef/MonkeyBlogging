import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { addDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
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
import PageNotfould from "../../pages/PageNotfould";
import slugify from "slugify";
import { toast } from "react-toastify";
import { ROUTERLINK } from "../../router/Router";

const CategoryUpdateStyled = styled.div`
  .form-control {
    max-width: 100%;
  }
`;

const CategoryUpdate = () => {
  const [category, setcategory] = useState({});
  const [searchParam] = useSearchParams();
  const categoryId = searchParam.get("id");
  const navigate = useNavigate();

  const docRef = doc(db, FIREBASE_COLLECTION.CATEGRORIES, categoryId);

  const { formState, handleSubmit, control, setValue, watch, reset } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const { isSubmitting } = formState;
  const watchStatus = Number(watch("status"));

  const onSubmit = async (values) => {
    const newValue = { ...values };
    newValue.status = Number(newValue.status);
    newValue.slug = slugify(newValue.slug || newValue.title, SLUG_SLUGIFY);

    delete newValue.time;
    try {
      await updateDoc(docRef, {
        ...newValue,
      });
      toast.success("Update category successful", TOAST_TYPE);
      navigate(ROUTERLINK.DASHBOARD_CATEGORY.path);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const categoryItem = {
        ...snapshot.data(),
      };

      reset(categoryItem);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, reset]);

  if (!categoryId) return <PageNotfould></PageNotfould>;

  return (
    <CategoryUpdateStyled>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id: ${categoryId}`}
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
    </CategoryUpdateStyled>
  );
};

export default CategoryUpdate;
