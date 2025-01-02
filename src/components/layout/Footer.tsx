"use client";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sosialFooter = {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
    location: "https://www.google.com/maps",
  };

  const socialIcons = [
    { href: sosialFooter.location, icon: <IoLocationOutline /> },
    { href: sosialFooter.facebook, icon: <FaFacebookF /> },
    { href: sosialFooter.twitter, icon: <FaTwitter /> },
    { href: sosialFooter.linkedin, icon: <FaLinkedinIn /> },
    { href: sosialFooter.instagram, icon: <FaInstagram /> },
  ];

  return (
    <div className="px-4 md:px-[220px] bg-[#4479BC] py-4 text-white">
      <div className="flex sm:flex-row flex-col gap-2 justify-between text-xs md:text-sm font-semibold tracking-wider">
        <span className="my-auto">© {currentYear} - PT. Graha Skrip Infra Prima. All Rights Reserved.</span>
        <div className="flex gap-1 max-[450px]:gap-2">
          {socialIcons.map((social, index) => (
            <Link
              key={index}
              href={social.href}
              target="_blank"
              className="p-2 sm:mx-auto my-auto rounded w-7.5 h-7.5 items-center text-center"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.10)" }}
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
