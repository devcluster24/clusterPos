/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { useUserLoginMutation } from "@/redux/features/auth/authApi";
import { Input, Form, Card } from "antd";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, TUser } from "@/redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [loginUser, { isLoading }] = useUserLoginMutation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  interface LoginFormValues {
    email: string;
    password: string;
  }

  // const onFinish = async (values: LoginFormValues) => {
  //   try {
  //     const result = await loginUser(values).unwrap();
  //     console.log("API Response:", result);

  //     if (result.success) {
  //       const accessToken = result.data?.accessToken;
  //       const decodedToken = jwtDecode(accessToken);
  //       console.log("Decoded Token:", decodedToken);

  //       // Show success message
  //       Swal.fire({
  //         title: "Success",
  //         text: result?.message || "You have successfully logged in!",
  //         icon: "success",
  //       });

  //       // Store user in Redux
  //       dispatch(setUser({ user: decodedToken, token: accessToken }));

  //       // Reset form and navigate to home
  //       form.resetFields();
  //       navigate("/");
  //     }
  //   } catch (error: any) {
  //     console.error("Login Error:", error);

  //     // Show error message
  //     Swal.fire({
  //       title: "Error",
  //       text: error?.data?.message || "Invalid email or password!",
  //       icon: "error",
  //     });

  //     // Dispatch logout to clear any existing user state
  //     dispatch(logout());
  //     form.resetFields();
  //   }
  // };
  const onFinish = async (values: LoginFormValues) => {
    try {
      const result = await loginUser(values).unwrap();
      console.log("Login API Response:", result);

      // Check for success correctly
      if (result.success) {
        Swal.fire({
          title: "Success",
          text: result.message || "You have successfully logged in!",
          icon: "success",
        });

        // Extract the access token correctly
        const accessToken = result.data.accessToken;
        const decodedToken = jwtDecode(accessToken) as TUser;
        console.log("Decoded Token:", decodedToken);

        // Store user in Redux correctly
        dispatch(setUser({ user: decodedToken, token: accessToken }));

        // Reset form & Navigate
        form.resetFields();
        navigate("/");
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      Swal.fire({
        title: "Error",
        text: error?.data?.message || "Invalid email or password!",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="p-8 max-w-sm w-full shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Bismillah Trading
        </h2>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label={<span className="font-semibold">Email</span>}
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              placeholder="Enter your email"
              type="email"
              className="border-2 hover:border-primary rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold">Password</span>}
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              type="password"
              className="border-2 hover:border-primary rounded-lg py-2"
            />
          </Form.Item>

          <Button
            className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-opacity-90 transition mt-2 cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            Login{" "}
            {isLoading && (
              <span className="w-5 h-5 animate-spin bg-white ml-2"></span>
            )}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
