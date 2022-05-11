import { useState } from 'react';
import './App.css';
import LoginModal from './views/LoginModal';

function App() {
  const [onModal, setOnModal] = useState(false)

  return (
    <div className="App">
      {onModal && <LoginModal setOnModal={(bool) => setOnModal(bool)} />}
      {/*
		<!-=========================-->
		<!--=        Navbar         =-->
		<!--=========================-->
    */}
      <header class="header header-magic-line">
        <div class="header-inner">
          <div class="tim-container clearfix">
            <div class="header-magic-line-inner clearfix">
              <div id="site-logo" class="float-left">
                <a href="index.html" class="logo-main">
                  <img src="assets/img/WEPLAYLIST_logo.png" alt="logo" />
                </a>

                <a href="index.html" class="logo-stickky">
                  <img src="assets/img/WEPLAYLIST_logo.png" alt="logo" />
                </a>
              </div>

              <ul class="user-login">
                <li>
                  <a href="#" class="off-opener">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                  </a>
                </li>
                <li><a onClick={() => setOnModal(true)}>
                  <i class="fa fa-user-o" aria-hidden="true"></i>

                </a></li>
              </ul>

              <div class="nav">

              </div>
              {/*<!-- /.nav -->*/}
            </div>
          </div>
          {/*<!-- /.tim-container -->*/}
        </div>
        {/*<!-- /.header-inner -->*/}
      </header>
      {/*<!-- /#header -->*/}

      <div class="offset-menu-two">
        <a href="#" class="offset-closer"><img src="assets/img/offset-cross2.png" alt="" /></a>

        <div class="footer-about">
          <p> There are many variations of passages of Lorem Ipsum available </p>

          <div class="footer-contact">

            <div class="contact-details clearfix">
              <i class="fa fa-envelope"></i>
              <p> mkcho1997@daum.net </p>
            </div>

          </div>
          {/*<!-- /.footer-address -->*/}
        </div>


        <div class="offset-social-two">
          <a href="">
            <img src="assets/img/logo_5.png" alt="" />
          </a>
          <ul>
            <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
            <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
            <li><a href="#"><i class="fa fa-pinterest" aria-hidden="true"></i></a></li>
            <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
          </ul>
        </div>
      </div>


      {/*
		<!--=============================-->
		<!--=        Mobile Nav         =-->
		<!--=============================-->
    */}
      <header id="mobile-nav-wrap">
        <div class="mob-header-inner d-flex justify-content-between">
          <div id="mobile-logo" class="d-flex justify-content-start">
            <a href="index.html"><img src="assets/img/WEPLAYLIST_logo.png" alt="Site Logo" /></a>
          </div>

          <ul class="user-link nav justify-content-end">
            <li><a href="#"><i class="fa fa-user"></i>Login</a></li>
            <li><a href="#"><i class="fa fa-sign-in"></i>Sign Up</a></li>
          </ul>

          <div id="nav-toggle" class="nav-toggle hidden-md">
            <div class="toggle-inner">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        {/*<!-- /.mob-header-inner -->*/}
      </header>
      {/*<!-- /#mobile-header -->*/}

      <div class="mobile-menu-inner">

        <div class="mobile-nav-top-wrap">
          <div class="mob-header-inner clearfix">
            <div class="d-flex justify-content-start mobile-logo">
              <a href="index.html">
                <img src="assets/img/logo-dark.png" alt="Site Logo" />
              </a>
            </div>

            <div class="close-menu">
              <span class="bar"></span>
              <span class="bar"></span>
            </div>
          </div>
          {/*<!-- /.mob-header-inner -->*/}

          <div class="close-menu">
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
        </div>
        {/*<!-- /.mobile-nav-top-wrap -->*/}

        <nav id="accordian">
          <ul class="accordion-menu">
            <li>
              <a href="#0" class="dropdownlink">Home</a>
              <ul class="submenuItems">
                <li><a href="index.html">Home One</a></li>
                <li><a href="index-two.html">Home Two</a></li>
                <li><a href="index-three.html">Home Three</a></li>
                <li><a href="index-four.html">Home Four</a></li>
              </ul>
            </li>
            <li>
              <a href="#0" class="dropdownlink">Artist</a>
              <ul class="submenuItems">
                <li><a href="artist.html">Artist</a></li>
                <li><a href="artist-single.html">Artist Details</a></li>
              </ul>
            </li>
            <li>
              <a href="album.html">Album</a>
            </li>
            <li>
              <a href="#0" class="dropdownlink">Events</a>
              <ul class="submenuItems">
                <li><a href="event.html">Events</a></li>
                <li><a href="contact.html">Contact Us</a></li>
              </ul>
            </li>
            <li>
              <a href="tabs.html">Tabs</a>

            </li>
            <li>
              <a href="#0" class="dropdownlink">Blog</a>
              <ul class="submenuItems">
                <li><a href="blog-list-right.html">Blog Standard</a></li>
                <li><a href="blog-grid-right.html">Blog Grid</a></li>
                <li><a href="blog-single.html">Blog Single</a></li>
              </ul>
            </li>

            <li>
              <a href="gallery.html">Gallery</a>
            </li>
            <li>
              <a href="#0" class="dropdownlink">Shop</a>
              <ul class="submenuItems">
                <li><a href="shop-right.html">Shop Right</a></li>
                <li><a href="shop-left.html">Shop Left</a></li>
                <li><a href="shop-single.html">Shop Details</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      {/*<!-- /.mobile-menu-inner -->*/}


      {/*
		<!--============================-->
		<!--=        	Banner         =-->
		<!--============================-->
    */}
      <section class="banner-five" data-bg-image="media/background/bg5.jpg">
        <div class="tim-container">
          <div id="para" class="paralax">
            <div id="paralax-1" class="scene">
              <div data-depth="-0.50"><img src="media/background/mouse-move.png" alt="" /></div>
            </div>
          </div>
          <div class="baneer-five-content">
            <div class="content sp-container">
              <div class="sp-content">
                <div class="sp-globe"></div>
                <h2 class="frame-1">WEPLAYLIST</h2>
                <h2 class="frame-2">SHARE YOUR</h2>
                <h2 class="frame-3">PLAYLIST WITH</h2>
                <h2 class="frame-4">YOUR FREINDS</h2>

              </div>
              <h3>MADE BY Pazbear</h3>
              <a class="tim-slide-btn" onClick={() => setOnModal(true)}>ENTER</a>
            </div>
          </div>
          {/*<!-- /.tim-container -->*/}
        </div>
        {/*<!-- /.tim-container -->*/}

        <div class="smoke-wrqpper">
          <canvas id="canvas"></canvas>
        </div>

      </section>
      {/*<!-- /#page-header -->*/}

      {/*<!--==============================-->
		<!--=        	Footer         	 =-->
      <!--==============================-->*/}

      <footer id="footer-2">
        <div class="container">
          <div class="d-flex justify-content-center row">
            <div class="col-xl-10">
              <div class="footer-three-bottom">
                <div class="footer-three-left">
                  <a href="#">
                    <img src="assets/img/logo_5_dark.png" alt="" />
                  </a>
                </div>
                <div class="footer-three-right">
                  <ul class="footer-three-menu">
                    <li><a href="#">Rules</a></li>
                    <li><a href="#">Terms of use</a></li>
                    <li><a href="#">Tickets</a></li>
                    <li><a href="#">policy</a></li>
                  </ul>
                  <div class="footer-social-three">
                    <ul>
                      <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                      <li><a href="#"><i class="fa fa-youtube-play"></i></a></li>
                      <li><a href="#"><i class="fa fa-cloud"></i></a></li>
                      <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                      <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                      <li><a href="#"><i class="fa fa-pinterest"></i></a></li>
                      <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                      <li><a href="#"><i class="fa fa-vine"></i></a></li>
                      <li><a href="#"><i class="fa fa-apple"></i></a></li>
                      <li><a href="#"><i class="fa fa-vimeo"></i></a></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
            {/*<!-- /.col-xl- -->*/}
          </div>
          {/*<!-- /.row -->*/}
        </div>
        {/*<!-- /.container -->*/}
      </footer>
      {/*<!-- /#footer -->*/}

      <div class="backtotop">
        <i class="fa fa-angle-up backtotop_btn"></i>
      </div>
    </div>
  );
}

export default App;
