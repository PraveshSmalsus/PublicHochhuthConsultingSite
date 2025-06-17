import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const RequiredData="Contact Form"
const ContactForm = (props) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        comment: '',
        agree: false,
        captcha: ''
    });
    const Type = props?.Type;
    const [captchaText, setCaptchaText] = useState('');
    const [captchaError, setCaptchaError] = useState('');

    function generateCaptcha() {
        let CaptchaTextGenerate = Math.random().toString(36).substring(2, 8); // Generate random captcha text
        setCaptchaText(CaptchaTextGenerate);
    }

    useEffect(() => {
        generateCaptcha(); // Generate captcha on component mount
    }, [])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { firstName, lastName, country, email, comment } = formData;
        const url = `https://testing.hochhuth-consulting.de/HHHHPUBLICAPI/insertForm.php`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    FirstName: firstName,
                    LastName: lastName,
                    Country: country,
                    Email: email,
                    Comment: comment
                })
            });

            if (response.ok) {
                const result = await response.json();
                alert('Form submitted successfully!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    country: '',
                    comment: '',
                    agree: false,
                    captcha: ''
                });
                generateCaptcha(); // Reset captcha after successful submission
            } else {
                alert('Failed to submit form.');
            }
        } catch (error) {
            alert('Network error, please try again later.');
        }
    };

    const validateCaptcha = () => {
        // Check if the CAPTCHA matches the generated text
        return formData.captcha.toLowerCase() === captchaText;
    };
    return (
        <div id="wrapper" className="clearfix">
            {Type !='SmartPage' && (<Navbar />)}

            <section id="content">
                <div className="content-wrap p-0">
                    <div id="section-contact" className="page-section section m-0 bg-color" style={{ padding: '80px 0', backgroundImage: 'linear-gradient(to bottom, #3D80E4 0%, #0a4bab 80%, #FFF 80%)' }}>
                        <div className="container clearfix">
                            <div className="row mx-auto dotted-bg" style={{ maxWidth: '740px' }}>
                                <div className="col-md-12">
                                    <div className="center dark mb-5">
                                        <h2 className="font-weight-bold mb-2 text-white">{RequiredData?.Heading}</h2>
                                    </div>
                                    <div className="card bg-white shadow-lg border-0">
                                        <div className="card-body p-5">
                                            <form className="row mb-0" id="userForm" onSubmit={handleSubmit}>
                                                <div className="col-12 form-group mb-4">
                                                    <label htmlFor="firstName">First Name:</label>
                                                    <input type="text" name="firstName" id="firstName" className="form-control form-control-lg required" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                                                </div>
                                                <div className="col-12 form-group mb-4">
                                                    <label htmlFor="lastName">Last Name:</label>
                                                    <input type="text" name="lastName" id="lastName" className="form-control form-control-lg required" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
                                                </div>
                                                <div className="col-12 form-group mb-4">
                                                    <label htmlFor="email">Email:</label>
                                                    <input type="email" name="email" id="email" className="form-control form-control-lg required" value={formData.email} onChange={handleChange} placeholder="Email" required />
                                                </div>
                                                <div className="col-12 form-group mb-4">
                                                    <label htmlFor="country">Country:</label>
                                                    <input type="text" name="country" id="country" className="form-control form-control-lg required" value={formData.country} onChange={handleChange} placeholder="Country" required />
                                                </div>
                                                <div className="col-12 form-group mb-4">
                                                    <label htmlFor="comment">Comment:</label>
                                                    <textarea name="comment" id="comment" className="form-control form-control-lg required" rows={4} value={formData.comment} onChange={handleChange} placeholder="Your comment or message" required></textarea>
                                                </div>
                                                <div className="col-12 form-group mb-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="gridCheck" name="agree" checked={formData.agree} onChange={handleChange} />
                                                        <label className="form-check-label" htmlFor="gridCheck">
                                                            <span className="terms-font">I have read the Privacy Policy note. I agree that my contact details and questions will be stored permanently.</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-12 form-group mb-4">
                                                    <label>
                                                        Captcha: {captchaText}
                                                        <span
                                                            className="captcha-refresh-icon mx-2"
                                                            onClick={generateCaptcha}
                                                        >
                                                            <svg
                                                                stroke="currentColor"
                                                                fill="currentColor"
                                                                strokeWidth="0"
                                                                version="1.1"
                                                                viewBox="0 0 17 17"
                                                                height="1em"
                                                                width="1em"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M6 8h-6v-6h1v4.109c1.013-3.193 4.036-5.484 7.5-5.484 3.506 0 6.621 2.36 7.574 5.739l-0.963 0.271c-0.832-2.95-3.551-5.011-6.611-5.011-3.226 0.001-6.016 2.276-6.708 5.376h4.208v1zM11 9v1h4.208c-0.693 3.101-3.479 5.375-6.708 5.375-3.062 0-5.78-2.061-6.611-5.011l-0.963 0.271c0.952 3.379 4.067 5.739 7.574 5.739 3.459 0 6.475-2.28 7.5-5.482v4.108h1v-6h-6z"
                                                                ></path>
                                                            </svg>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="captcha"
                                                        className="form-control form-control-lg required"
                                                        value={formData.captcha}
                                                        onChange={handleChange}
                                                        placeholder="Enter Captcha"
                                                        required
                                                    />
                                                    {captchaError && <p className="text-danger">{captchaError}</p>}
                                                </div>
                                                <div className="col-12 form-group">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-block text-white bg-color w-100 py-2 font-weight-semibold text-uppercase mt-2"
                                                        disabled={!formData.captcha || !validateCaptcha()} // Disable if CAPTCHA is not correct
                                                    >
                                                        SEND MESSAGE
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {Type !='SmartPage' && (<Footer />)}

        </div>
    );
};

export default ContactForm;
