import { Formik, Form } from "formik";
import LoginInput from "../../components/inputs/loginInput";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
const ChangePassword = ({
  password,
  setPassword,
  confPassword,
  setConfPassword,
  error,
  setError,
  loading,
  setLoading,
  userInfos,
}) => {
  const navigate = useNavigate();
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),

    confPassword: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });

  const { email } = userInfos;

  const changedPassword = async () => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {
        email,
        password,
      });
      setError("");
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="reset_form" style={{ height: "310px" }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Please Pick a Strong Password.</div>
      <Formik
        enableReinitialize
        initialValues={{ password, confPassword }}
        validationSchema={validatePassword}
        onSubmit={() => {
          changedPassword();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
            <LoginInput
              type="password"
              name="confPassword"
              onChange={(e) => setConfPassword(e.target.value)}
              placeholder="Confirm New Password"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
