import React from "react";
import myPic from "../../images/myImage.JPG";
import { FaFacebook } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";

import "./About.css";

const About = (props) => {
  return (
    <div className="my-container">
      <div className="my-image-about-container">
        <div className="my-image-container box-shadow">
          <img src={myPic} alt="my pic" />
        </div>

        <div className="about-follow-container box-shadow">
          <div className="about-container">
            <p>
              It is my first work that I dedicate to my to my wife{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {" "}
                DEEPSIKHA{" "}
              </span>{" "}
              whose love , affection , encouragement and desire make me able to
              get such success.
            </p>
            <p>
              I have been wanting to make a web site for a long time. Then my
              student{" "}
              <span style={{ color: "red", fontWeight: "bold" }}> RAJAT </span>{" "}
              gave me the idea of ​​ web development and from there it occurred
              to me to make this web site.
            </p>

            <p>
              I <span>Satadru Bhattacharyya</span>, learning web development.
              This app is my first project on mcq type questions in various
              subjects. It helps students to solve mcq questions in any platform
              like desktop, mobile , tab etc.
            </p>

            <p>
              Multiple Choice Questions (MCQs) are generally recognized as the
              most widely applicable and useful type of objective test items.
              They could be used to measure the most important educational
              outcomes - knowledge, understanding, judgment and problem solving.
            </p>
            <p>
              Multiple choice (MC), objective response, or MCQ (for Multiple
              Choice Question) is a form of an objective assessment in which
              respondents are asked to select only correct answers from the
              choices offered as a list. The multiple choice format is most
              frequently used in educational testing, in market research, and in
              elections, when a person chooses between multiple candidates,
              parties, or policies.
            </p>
            <p>
              Although E. L. Thorndike developed an early scientific approach to
              testing students, it was his assistant Benjamin D. Wood who
              developed the multiple-choice test. Multiple-choice testing
              increased in popularity in the mid-20th century when scanners and
              data-processing machines were developed to check the result.
              Christopher P. Sole created the first multiple-choice examination
              for computers on a Sharp Mz 80 computer in 1982. It was developed
              to aid people with dyslexia cope with agricultural subjects, as
              Latin plant names can be difficult to understand and write.
            </p>
          </div>

          <div className="email-follow-container">
            <div className="email-container">
              <a
                href="mailto:jewel.etc@gmail.com?body=My custom mail body"
                title="email"
              >
                <AiTwotoneMail className="email-icon" />
              </a>
            </div>

            <div className="follow-container">
              <a href="https://www.facebook.com/satadru.bhattacharyya">
                <FaFacebook className="facebook-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
