import s from "./giftCardSuccess.module.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { fetchUserByEmail, fetchSendCard } from "../../Redux/thunks/giftCardThunks";
import { useNavigate } from "react-router-dom";
import { resetUserOwner } from "../../Redux/slices/giftCardSlice";
import Swal from "sweetalert2";
import Footer from "../Footer/footer";

const GiftCardSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userOwner } = useSelector((state) => state.giftCard);

  const userInfo = {
    id: userOwner._id,
    GiftCard: (window.localStorage.getItem('cartTotalAmount')),
    name: userOwner.name
  }

  const handleSendCard = () => {
    dispatch(fetchSendCard(userInfo))
    Swal.fire({
      title: "Success!",
      text: "The gift card was sent.",
      icon: "success",
      showConfirmButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: "#3f37c9",
    }).then((response) => {
      if (response.isConfirmed) {
        navigate("/");
      }
    });
  }

  const handleUserOwner = () => {
    dispatch(resetUserOwner());
    Swal.fire({
      title: "Sorry!",
      text: "There is no user using this e-mail.",
      icon: "info",
      showConfirmButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: "#3f37c9",
    }).then((response) => {
      if (response.isConfirmed) {
        navigate("/giftCard-success");
      }
    });
  };

  return (
    <div className={s.mainContainer}>
      <Formik
        initialValues={{
          correo: "",
        }}
        validate={(values) => {
          let errors = {};

          if (!values.correo) {
            errors.correo = "Please type an email";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.correo
            )
          ) {
            errors.correo = "Type a valid email";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          dispatch(fetchUserByEmail(values.correo));
          resetForm();
        }}
      >
        {({ errors }) => (
          <Form>
            <h1>
              Please type the email of the user to whom you want to give the
              card.
            </h1>
            <div className={s.inputContainer}>
              <Field
                type="search"
                name="correo"
                placeholder="email@email.com"
                className={s.emailInput}
              />
              <Field type="submit" value="Search" className={s.button} />
            </div>
            <ErrorMessage
              name="correo"
              component={() => <span className={s.error}>{errors.correo}</span>}
            />
          </Form>
        )}
      </Formik>
      {userOwner._id && (
        <div className={s.userContainer}>
          <div className={s.image}>
            <img src={userOwner.image} alt={userOwner.name} />
          </div>
          <div className={s.info}>
            <span>Name: {userOwner.name}</span>
            <span>Email: {userOwner.email}</span>
            <button onClick={handleSendCard}>Send Gift Card</button>
          </div>
        </div>
      )}

      {userOwner === true && handleUserOwner()}
      <Footer className={s.footer} />
    </div>
  );
};

export default GiftCardSuccess;
