import { APP_NAME } from "@/lib/constants/constants";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full border-t">
      <div className="wrapper py-4">
        <p className="text-center text-sm">
          &copy; {currentYear} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
