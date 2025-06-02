import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/sections/navbar/navbar";
import profileImage from "../../assets/img/HomePage/profile_img.webp";
import { FaPlus, FaCheck } from "react-icons/fa6";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [tempName, setTempName] = useState("");
  const [tempImage, setTempImage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName") || "";
    const storedImage = localStorage.getItem("userProfileImage") || "";
    setName(storedName);
    setImage(storedImage);
    setTempName(storedName);
    setTempImage(storedImage);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setTempImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAccept = () => {
    setName(tempName);
    setImage(tempImage);
    localStorage.setItem("userName", tempName);
    localStorage.setItem("userProfileImage", tempImage);

    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
      // navigate("/deutsch-lernen");
    }, 2000);
  };

  const handleCancel = () => {
    setTempName(name);
    setTempImage(image);
    navigate("/deutsch-lernen");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <section className="profile">
      {showNotification && (
        <div className="profile__notification">Data saved successfully</div>
      )}

      <div className="profile__header">
        <div className="profile__header-setting">
          <FaPlus className="profile__header-cancel" onClick={handleCancel} />
          <div className="profile__header-title">Your Account</div>
          <FaCheck className="profile__header-accept" onClick={handleAccept} />
        </div>

        <div className="profile__header-img">
          <img src={tempImage || profileImage} alt="Profile" />
        </div>

        <div
          className="profile__header-change"
          onClick={() => fileInputRef.current.click()}
        >
          Change profile photo
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>

      <div className="profile__container">
        <div className="profile__info">
          <div className="profile__title">Personal Information</div>
          <div className="profile__info-item">
            <div className="profile__info-item-title">Name</div>
            <input
              type="text"
              className="profile__info-item-input"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Enter Name"
            />
          </div>
        </div>

        <div className="profile__settings">
          <div className="profile__title">Settings</div>
          <div className="profile__info-item">
            <div className="profile__info-item-title">Theme</div>
            <div className="profile__theme-switch">
              <label className="profile__theme-switch-label">
                <input
                  type="checkbox"
                  className="profile__theme-checkbox"
                  checked={theme === "light"}
                  onChange={toggleTheme}
                />
                <span className="profile__theme-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <Navbar />
    </section>
  );
};

export default ProfilePage;
