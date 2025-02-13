import React, { useState, useEffect } from "react";
import axios from "axios";
export default function PrivacyAndPolicy() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get("https://argosmob.uk/api-random/getPrivacyPolicyData.php")
      .then((response) => {
        if (response?.data?.success) {
          setContent(response?.data?.data?.Description);
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching the navigation data:", error);
      });
  }, []);
  return (
    <section id="content" className="pt-4">
      <div className="content-wrap">
        <section className="page-section mt-0 section bg-transparent pt-0">
          <div className="container clearfix">
            <div className="heading-block fancy-title border-bottom-0 title-bottom-border bottommargin-sm">
              <h4>
                <strong>Privacy Policy</strong>
              </h4>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </section>
      </div>
    </section>
  );
}
