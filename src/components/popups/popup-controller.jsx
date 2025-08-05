"use client";
import { useState } from 'react';
import PopupButton from './popup-button';
import EmailSignup from './email-signup';

export default function PopupController() {
  // do not open on load
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <PopupButton onClick={() => setPopupOpen(true)} />
      <EmailSignup open={popupOpen} setOpen={setPopupOpen} />
    </>
  );
}
