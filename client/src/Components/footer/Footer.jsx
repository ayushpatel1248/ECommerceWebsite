import React from 'react';
import './footer.css'; // Import your CSS file
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <div className='.body'> 
<footer class="new_footer_area bg_color">
            <div class="new_footer_top">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-6">
                            <div class="f_widget company_widget wow fadeInLeft footer-widget" data-wow-delay="0.2s" style={{visibility: 'visible',animationDelay: '0.2s', animationName: 'fadeInLeft'}}>
                                <h3 class="f-title f_600 t_color f_size_18">Get in Touch</h3>
                                <p>Dont miss any updates of our new templates and extensions.!</p>
                                <form action="#" class="f_subscribe_two mailchimp" method="post" novalidate="true" _lpchecked="1">
                                    {/* <input type="text" name="EMAIL" class="form-control memail" placeholder="Email"></input> */}
                                    {/* <button class="btn btn_get btn_get_two" type="submit">Subscribe</button> */}
                                    <p class="mchimp-errmessage" style={{ display: 'none' }}></p>
                                    <p class="mchimp-sucmessage" style={{ display: 'none' }}></p>
                                </form>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 services">
                            <div class="f_widget about-widget pl_70 wow fadeInLeft service" data-wow-delay="0.4s"style={{visibility: 'visible',animationDelay: '0.4s', animationName: 'fadeInLeft'}}>
                                <h3 class="f-title f_600 t_color f_size_18">Service available</h3>
                                <ul class="list-unstyled f_list">
                                    <li><a href="#">Company</a></li>
                                    <li><a href="#">Android App</a></li>
                                    <li><a href="#">ios App</a></li>
                                    <li><a href="#">Desktop</a></li>
                                    {/* <li><a href="#">Projects</a></li> */}
                                    {/* <li><a href="#">My tasks</a></li> */}
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 services help">
                            <div class="f_widget about-widget pl_70 wow fadeInLeft service" data-wow-delay="0.6s" style={{visibility: 'visible',animationDelay: '0.6s', animationName: 'fadeInLeft'}}>
                                <h3 class="f-title f_600 t_color f_size_18">Help</h3>
                                <ul class="list-unstyled f_list">
                                    <li><a href="#">FAQ</a></li>
                                    <li><a href="#">Term &amp; conditions</a></li>
                                    <li><a href="#">Reporting</a></li>
                                    {/* <li><a href="#">Documentation</a></li> */}
                                    <li><a href="#">Support Policy</a></li>
                                    {/* <li><a href="#">Privacy</a></li> */}
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="f_widget social-widget pl_70 wow fadeInLeft footer-widget" data-wow-delay="0.8s" style={{visibility: 'visible',animationDelay: '0.8s', animationName: 'fadeInLeft'}}>
                                <h3 class="f-title f_600 t_color f_size_18">Team Solutions</h3>
                                <div class="f_social_icon">
                                    <a href="#" class="fab fa-facebook"></a>
                                    <a href="#" class="fab fa-twitter"></a>
                                    <Link to="https://www.linkedin.com/in/harshit-nagar-7aa701251/" class="fab fa-linkedin" target='_block'></Link>
                                    <a href="#" class="fab fa-pinterest"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer_bg">
                    <div class="footer_bg_one"></div>
                    <div class="footer_bg_two"></div>
                </div>
            </div>
            <div class="footer_bottom">
                <div class="container">
                    <div class="f-d-flex">
                        <div class="col-lg-6 col-sm-7">
                            <p class="mb-0 f_400 reserved">© Inc.. 2024 All rights reserved.</p>
                        </div>
                        <div class="col-lg-6 col-sm-5 text-rightt ">
                            <p>Developed By <i class="icon_heart"></i>  <a href="" target="_blank">pro Programer</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

   
    </div>
  );
};

export default Footer;
