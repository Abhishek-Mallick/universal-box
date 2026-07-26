import React, { useEffect } from "react";
import $ from "jquery";
import { TweenMax } from "gsap";

import "./cursor.css";

export default function Cursor() {
  useEffect(() => {
    var cursor = $(".cursor"),
      follower = $(".follower");

    var posX = 0,
      posY = 0;

    var mouseX = 0,
      mouseY = 0;

    // Set a delay for the initial execution of the TweenMax animation
    setTimeout(() => {
      TweenMax.to({}, 0.02, {
        repeat: -1,
        onRepeat: function () {
          posX += (mouseX - posX) / 5; // Adjust the division factor for smoother movement
          posY += (mouseY - posY) / 5; // Adjust the division factor for smoother movement
          TweenMax.set(follower, { css: { left: posX - 5, top: posY - 5 } });
          TweenMax.set(cursor, { css: { left: mouseX, top: mouseY } });
        },
      });
    }, 100); // Delay in milliseconds

    $(document).on("mousemove", function (e) {
      mouseX = e.pageX;
      mouseY = e.pageY;
    });

    $(".keyb").on("mouseenter", function () {
      cursor.addClass("active");
      follower.addClass("active");
      follower.addClass("gif");
    });

    $(".keyb").on("mouseleave", function () {
      cursor.removeClass("active");
      follower.removeClass("active");
      follower.removeClass("gif");
    });
    $(".new").on("mouseenter", function () {
      cursor.addClass("active");
      follower.addClass("active2");
    });
    $("#new2").on("mouseenter", function () {
      cursor.addClass("active");
      follower.addClass("active");
      follower.addClass("gif2");
    });
    $(".new").on("mouseleave", function () {
      cursor.removeClass("active");
      follower.removeClass("active2");
    });
    $("#new2").on("mouseleave", function () {
      cursor.removeClass("active");
      follower.removeClass("active");
      follower.removeClass("gif2");
    });
    // $("BsFillSunFill").on("mouseenter", function () {
    //   cursor.addClass("active");
    //   follower.addClass("active");
    // });
    // $("BsFillSunFill").on("mouseleave", function () {
    //   cursor.removeClass("active");
    //   follower.removeClass("active");
    // });
    // $("AiFillTwitterCircle").on("mouseenter", function () {
    //   cursor.addClass("active");
    //   follower.addClass("active2");
    // });
    // $("AiFillTwitterCircle").on("mouseleave", function () {
    //   cursor.removeClass("active");
    //   follower.removeClass("active2");
    // });
    $(window).on("scroll", function () {
      follower.removeClass("active");
    });
  }, []);

  // The empty array makes this useEffect run once after initial render

  return (
    <>
      <div className="cursor"></div>
      <div className="follower"></div>
    </>
  );
}
