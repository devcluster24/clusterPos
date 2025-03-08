import { Button } from "@/components/ui/button";
import { Input, Form, Card } from "antd";

const Login = () => {
  interface LoginFormValues {
    email: string;
    password: string;
  }

  const onFinish = (values: LoginFormValues) => {
    console.log("Success:", values);
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="p-8 max-w-sm w-full shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Bismillah Trading
        </h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<span className=" font-semibold">Email</span>}
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              placeholder="Enter your email"
              className="border-2 hover:border-primary rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label={<span className=" font-semibold">Password</span>}
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              // type={passwordVisible ? "text" : "password"}
              type="password"
              placeholder="Enter your password"
              className="border-2 hover:border-primary rounded-lg py-2"
            />
          </Form.Item>

          <Button
            className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-opacity-90 transition mt-2 cursor-pointer"
            type="submit"
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
