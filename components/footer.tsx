export function Footer() {
  return (
    <footer className="wn-footer">
      <div className="wn-footer__top">
        <div className="wn-footer__grid">
          {/* Column 1 - Company Info */}
          <div className="wn-footer__block">
            <h2 className="wn-footer__heading">
              Your Path to Ultimate Wellness
            </h2>
            <div className="wn-footer__rte">
              <p>
                <strong>GlobalEcomCom LLC dba Wellness Nest:</strong>
              </p>
              <p>
                <strong>US Address: </strong>1942 Broadway ste 314c, Boulder
                Colorado 80302, United States
              </p>
              <p>
                <strong>HQ:</strong> +1 7194134245
                <br />
                <strong>Support:</strong> +1 8559075279
              </p>
              <p>
                <strong>Email: </strong>support@wellnessnest.co
              </p>
            </div>
          </div>

          {/* Column 2 - Our Policy */}
          <div className="wn-footer__block">
            <h2 className="wn-footer__heading">Our Policy</h2>
            <ul className="wn-footer__links">
              {[
                {
                  label: "Privacy Policy",
                  href: "https://wellnessnest.co/policies/privacy-policy"
                },
                {
                  label: "Refund & Return Policy",
                  href: "https://wellnessnest.co/policies/refund-policy"
                },
                {
                  label: "Shipping Policy",
                  href: "https://wellnessnest.co/policies/shipping-policy"
                },
                {
                  label: "Terms of Service",
                  href: "https://wellnessnest.co/policies/terms-of-service"
                },
                {
                  label: "FAQs",
                  href: "https://wellness-nest.gorgias.help/en-US"
                }
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="wn-footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Learn */}
          <div className="wn-footer__block">
            <h2 className="wn-footer__heading">Learn</h2>
            <ul className="wn-footer__links">
              {[
                {
                  label: "Our Story",
                  href: "https://wellnessnest.co/pages/about-us"
                },
                {
                  label: "Our Contact",
                  href: "https://wellnessnest.co/pages/contact-us"
                },
                {
                  label: "Manage Subscription",
                  href: "https://wellnessnest.co/pages/manage-my-subscription"
                },
                {
                  label: "Track My Order",
                  href: "https://wellnessnest.co/apps/trackingmore"
                },
                {
                  label: "Join Our Affiliate Club",
                  href: "https://wellnessnest.goaffpro.com"
                },
                {
                  label: "Claim My Rewards",
                  href: "https://wellnessnest.co/pages/joy-loyalty-page"
                },
                {
                  label: "Join Our Community",
                  href: "https://wellnessnest.co/pages/our-community"
                }
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="wn-footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="wn-footer__block">
            <h2 className="wn-footer__heading">
              Get Wellness Nest, Join Our Email List For Exclusive Offers &amp;
              Update
            </h2>
            <p className="wn-footer__newsletter-desc">
              Subscribe to get notified about product launches, special offers
              and company news
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="wn-footer__newsletter"
            >
              <div className="wn-footer__field">
                <input
                  type="email"
                  name="contact[email]"
                  className="wn-footer__input"
                  placeholder="Email"
                  required
                />
                <label className="wn-footer__label">Email</label>
              </div>
              <button type="submit" className="wn-footer__submit">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="wn-footer__bottom">
        <div className="wn-footer__bottom-inner">
          {/* Payment icons */}
          <div className="wn-footer__payment">
            <ul className="wn-footer__payment-list">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 38 24"
                  width="38"
                  height="24"
                  aria-labelledby="pi-amazon"
                >
                  <title id="pi-amazon">Amazon</title>
                  <path
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    fill="#000"
                    fillRule="nonzero"
                    opacity=".07"
                  />
                  <path
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    fill="#FFF"
                    fillRule="nonzero"
                  />
                  <path
                    d="M25.26 16.23c-1.697 1.48-4.157 2.27-6.275 2.27-2.97 0-5.644-1.3-7.666-3.463-.16-.17-.018-.402.173-.27 2.183 1.504 4.882 2.408 7.67 2.408 1.88 0 3.95-.46 5.85-1.416.288-.145.53.222.248.47v.001zm.706-.957c-.216-.328-1.434-.155-1.98-.078-.167.024-.193-.148-.043-.27.97-.81 2.562-.576 2.748-.305.187.272-.047 2.16-.96 3.063-.14.138-.272.064-.21-.12.205-.604.664-1.96.446-2.29h-.001z"
                    fill="#F90"
                    fillRule="nonzero"
                  />
                  <path
                    d="M21.814 15.291c-.574-.498-.676-.73-.993-1.205-.947 1.012-1.618 1.315-2.85 1.315-1.453 0-2.587-.938-2.587-2.818 0-1.467.762-2.467 1.844-2.955.94-.433 2.25-.51 3.25-.628v-.235c0-.43.033-.94-.208-1.31-.212-.333-.616-.47-.97-.47-.66 0-1.25.353-1.392 1.085-.03.163-.144.323-.3.33l-1.677-.187c-.14-.033-.296-.153-.257-.38.386-2.125 2.223-2.766 3.867-2.766.84 0 1.94.234 2.604.9.842.82.762 1.918.762 3.11v2.818c0 .847.335 1.22.65 1.676.113.164.138.36-.003.482-.353.308-.98.88-1.326 1.2a.367.367 0 01-.414.038zm-1.659-2.533c.34-.626.323-1.214.323-1.918v-.392c-1.25 0-2.57.28-2.57 1.82 0 .782.386 1.31 1.05 1.31.487 0 .922-.312 1.197-.82z"
                    fill="#221F1F"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-labelledby="pi-american_express"
                  viewBox="0 0 38 24"
                  width="38"
                  height="24"
                >
                  <title id="pi-american_express">American Express</title>
                  <path
                    fill="#000"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z"
                    opacity=".07"
                  />
                  <path
                    fill="#006FCF"
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z"
                  />
                  <path
                    fill="#FFF"
                    d="M22.012 19.936v-8.421L37 11.528v2.326l-1.732 1.852L37 17.573v2.375h-2.766l-1.47-1.622-1.46 1.628-9.292-.02Z"
                  />
                  <path
                    fill="#006FCF"
                    d="M23.013 19.012v-6.57h5.572v1.513h-3.768v1.028h3.678v1.488h-3.678v1.01h3.768v1.531h-5.572Z"
                  />
                  <path
                    fill="#006FCF"
                    d="m28.557 19.012 3.083-3.289-3.083-3.282h2.386l1.884 2.083 1.89-2.082H37v.051l-3.017 3.23L37 18.92v.093h-2.307l-1.917-2.103-1.898 2.104h-2.321Z"
                  />
                  <path
                    fill="#FFF"
                    d="M22.71 4.04h3.614l1.269 2.881V4.04h4.46l.77 2.159.771-2.159H37v8.421H19l3.71-8.421Z"
                  />
                  <path
                    fill="#006FCF"
                    d="m23.395 4.955-2.916 6.566h2l.55-1.315h2.98l.55 1.315h2.05l-2.904-6.566h-2.31Zm.25 3.777.875-2.09.873 2.09h-1.748Z"
                  />
                  <path
                    fill="#006FCF"
                    d="M28.581 11.52V4.953l2.811.01L32.84 9l1.456-4.046H37v6.565l-1.74.016v-4.51l-1.644 4.494h-1.59L30.35 7.01v4.51h-1.768Z"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 38 24"
                  width="38"
                  height="24"
                  aria-labelledby="pi-apple_pay"
                >
                  <title id="pi-apple_pay">Apple Pay</title>
                  <path
                    fill="#000"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    opacity=".07"
                  />
                  <path
                    fill="#fff"
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                  />
                  <path
                    fill="#000"
                    d="M12.71 8.37c-.4.5-1.06.87-1.72.82-.08-.66.24-1.36.62-1.8.4-.49 1.1-.83 1.66-.86.07.68-.2 1.35-.56 1.84zm.56 .94c-.95-.05-1.76.54-2.21.54-.46 0-1.16-.52-1.92-.5-.99.02-1.9.57-2.4 1.46-1.03 1.78-.26 4.42.73 5.87.49.71 1.07 1.5 1.84 1.47.73-.03 1.01-.47 1.9-.47.88 0 1.13.47 1.9.46.79-.01 1.29-.72 1.78-1.44.56-.81.78-1.6.8-1.64-.02-.01-1.53-.59-1.55-2.33-.01-1.46 1.19-2.16 1.24-2.19-.67-1-.72-1.23-.72-1.23z"
                  />
                  <path
                    fill="#000"
                    d="M21.36 7.54c2.41 0 4.09 1.66 4.09 4.08 0 2.44-1.7 4.1-4.14 4.1h-2.67v4.24h-1.94V7.54h4.66zm-2.72 6.59h2.21c1.68 0 2.63-.9 2.63-2.5 0-1.6-.95-2.5-2.62-2.5h-2.22v5zm8.17 1.71c0-1.59 1.22-2.57 3.39-2.69l2.5-.14v-.71c0-1.01-.67-1.61-1.79-1.61-1.06 0-1.74.51-1.9 1.3h-1.78c.09-1.62 1.48-2.82 3.74-2.82 2.2 0 3.63 1.17 3.63 2.98v6.26h-1.79v-1.49h-.04c-.53 1.01-1.68 1.63-2.87 1.63-1.79 0-3.09-1.1-3.09-2.71zm5.89-.81v-.72l-2.25.14c-1.12.07-1.76.56-1.76 1.33 0 .79.67 1.31 1.69 1.31 1.33 0 2.32-.91 2.32-2.06z"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 38 24"
                  width="38"
                  height="24"
                  aria-labelledby="pi-diners_club"
                >
                  <title id="pi-diners_club">Diners Club</title>
                  <path
                    opacity=".07"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                  />
                  <path
                    fill="#fff"
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                  />
                  <path
                    d="M12 12v3.7c0 .3-.2.3-.5.2-1.9-.8-3-3.3-2.3-5.4.4-1.1 1.2-2 2.3-2.4.4-.2.5-.1.5.2V12zm2 0V8.3c0-.3 0-.3.3-.2 2.1.8 3.2 3.3 2.4 5.4-.4 1.1-1.2 2-2.3 2.4-.3.1-.4.1-.4-.2V12zm7-1c0-3.2-2.7-5.9-6-5.9S9 7.8 9 11c0 3.2 2.7 5.9 6 5.9s6-2.7 6-5.9zm-6-7.5c4.6 0 8.3 3.3 8.3 7.5s-3.7 7.5-8.3 7.5-8.3-3.3-8.3-7.5S10.4 3.5 15 3.5zm14.5 7.5c0-3.2-2.7-5.9-6-5.9h-3.8C23 5.6 26 8 26 11c0 3-3 5.4-6.3 5.9h3.8c3.3 0 6-2.7 6-5.9z"
                    fill="#0079BE"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 38 24"
                  width="38"
                  height="24"
                  aria-labelledby="pi-discover"
                >
                  <title id="pi-discover">Discover</title>
                  <path
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    fill="#000"
                    opacity=".07"
                  />
                  <path
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    fill="#fff"
                  />
                  <path
                    d="M37 16.95V21c0 1.1-.9 2-2 2H23.228l7.896-12H35c1.1 0 2 .9 2 2v3.95z"
                    fill="#EBB23A"
                  />
                  <path
                    d="M13 12c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.4-3-3z"
                    fill="#F48120"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 38 24"
                  width="38"
                  height="24"
                  aria-labelledby="pi-google_pay"
                >
                  <title id="pi-google_pay">Google Pay</title>
                  <path
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    fill="#000"
                    opacity=".07"
                  />
                  <path
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    fill="#FFF"
                  />
                  <path
                    d="M18.093 11.976v3.2h-1.018v-7.9h2.691a2.447 2.447 0 011.747.692 2.28 2.28 0 01.005 3.293c-.46.443-1.05.665-1.752.665h-1.673zm0-3.732v2.788h1.698c.377 0 .754-.145 1.031-.424a1.39 1.39 0 00-.007-1.99 1.39 1.39 0 00-1.024-.374h-1.698zm7.674 1.489c.744 0 1.33.199 1.757.598.428.398.642.944.642 1.639v3.32h-.96v-.749h-.044c-.416.616-1.001.925-1.751.925a2.39 2.39 0 01-1.633-.57 1.84 1.84 0 01-.656-1.449c0-.613.232-1.1.696-1.462.464-.363 1.082-.544 1.855-.544.66 0 1.203.123 1.627.37v-.259c0-.437-.18-.825-.538-1.1a1.74 1.74 0 00-1.131-.425c-.664 0-1.19.283-1.577.847l-.883-.555c.547-.79 1.343-1.186 2.596-1.186zm-1.44 4.249c0 .327.14.613.421.853.28.24.614.36 1 .36.54 0 1.033-.21 1.413-.588.38-.379.57-.828.57-1.349-.358-.27-.86-.404-1.501-.404-.467 0-.858.118-1.171.353-.314.236-.47.527-.47.775h-.262zm8.883-4.073l-3.39 7.79h-1.048l1.26-2.735-2.234-5.055h1.104l1.612 3.876h.022l1.57-3.876h1.104z"
                    fill="#5F6368"
                  />
                  <path
                    d="M13.986 11.284c0-.308-.024-.6-.075-.885h-3.72v1.601h2.148c-.1.502-.38.93-.78 1.21v1.004h1.239c.727-.668 1.188-1.648 1.188-2.93z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.191 14.225c1.044 0 1.924-.344 2.568-.943l-1.24-1.003c-.348.232-.793.37-1.327.37-.997 0-1.852-.67-2.163-1.58H6.756v1.028a3.857 3.857 0 003.435 2.128z"
                    fill="#34A853"
                  />
                  <path
                    d="M8.028 11.069a2.32 2.32 0 010-1.49V8.551H6.756a3.88 3.88 0 000 3.546l1.272-1.028z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M10.191 7.999a2.1 2.1 0 011.483.579l1.087-1.087A3.67 3.67 0 0010.191 6.2a3.857 3.857 0 00-3.435 2.128l1.272 1.028c.311-.91 1.166-1.357 2.163-1.357z"
                    fill="#EA4335"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 38 24"
                  width="38"
                  height="24"
                  aria-labelledby="pi-jcb"
                >
                  <title id="pi-jcb">JCB</title>
                  <path
                    opacity=".07"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                  />
                  <path
                    fill="#fff"
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                  />
                  <path
                    fill="#006EBC"
                    d="M11.5 5H15v11.5a2.5 2.5 0 01-2.5 2.5H9v-11.5A2.5 2.5 0 0111.5 5z"
                  />
                  <path
                    fill="#E30138"
                    d="M19.5 5H23v11.5a2.5 2.5 0 01-2.5 2.5H17V7.5A2.5 2.5 0 0119.5 5z"
                  />
                  <path
                    fill="#41964B"
                    d="M27.5 5H31v11.5a2.5 2.5 0 01-2.5 2.5H25V7.5A2.5 2.5 0 0127.5 5z"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 38 24"
                  width="38"
                  height="24"
                  aria-labelledby="pi-master"
                >
                  <title id="pi-master">Mastercard</title>
                  <path
                    opacity=".07"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                  />
                  <path
                    fill="#fff"
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                  />
                  <circle fill="#EB001B" cx="15" cy="12" r="7" />
                  <circle fill="#F79E1B" cx="23" cy="12" r="7" />
                  <path
                    fill="#FF5F00"
                    d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 38 24"
                  width="38"
                  height="24"
                  aria-labelledby="pi-paypal"
                >
                  <title id="pi-paypal">PayPal</title>
                  <path
                    opacity=".07"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                  />
                  <path
                    fill="#fff"
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                  />
                  <path
                    fill="#003087"
                    d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4h2.3l.6-3.5v.2c.1-.3.3-.5.6-.5h1.3c2.5 0 4.5-1 5-4 .1-.2.1-.4.1-.5-.1-.1-.1-.1 0 0 .2-1 0-1.7-.3-2.4z"
                  />
                  <path
                    fill="#3086C8"
                    d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4h2.3l.6-3.5v.2c.1-.3.3-.5.6-.5h1.3c2.5 0 4.5-1 5-4 0-.1.1-.3.1-.5-.1 0-.1 0 0 0-.2-.5-.2-.5-.3-.4z"
                  />
                  <path
                    fill="#012169"
                    d="M15.9 8.4c0-.2.1-.3.2-.4.1-.1.2-.1.3-.1h4.4c.5 0 1 0 1.4.1.1 0 .3 0 .4.1.1 0 .2 0 .3.1.1 0 .1 0 .2.1.3.1.5.2.6.3.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4h2.3l.6-3.5.7-4.1z"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-labelledby="pi-shopify_pay"
                  viewBox="0 0 38 24"
                  width="38"
                  height="24"
                >
                  <title id="pi-shopify_pay">Shop Pay</title>
                  <path
                    opacity=".07"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                  />
                  <path
                    fill="#5A31F4"
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                  />
                  <path
                    d="M21.382 9.712c0 1.175-.614 1.98-1.828 2.38l1.87 2.862h-1.828l-1.644-2.56h-1.036v2.56h-1.505V7.736h2.868c1.503 0 2.103.88 2.103 1.976zm-3.466.86h1.132c.64 0 1.1-.263 1.1-.86 0-.593-.347-.86-1.036-.86h-1.196v1.72zm-3.404-.16c0-.604-.296-.907-1.036-.907h-1.32v5.46h1.505v-1.94h.574l1.032 1.94h1.686l-1.236-2.285c.68-.347 1.038-.973 1.038-1.73v-.537h-.243zM12.24 9.504h1.198c.463 0 .737.215.737.626 0 .41-.274.626-.737.626H12.24v-1.252z"
                    fill="#fff"
                  />
                  <path
                    d="M9.04 7.736h2.41c1.164 0 1.8.658 1.8 1.543 0 .58-.258 1.062-.708 1.348.554.232.948.72.948 1.394v.073c0 1.006-.76 1.67-1.946 1.67H9.04V7.735z"
                    fill="#fff"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 38 24"
                  width="38"
                  height="24"
                  aria-labelledby="pi-venmo"
                >
                  <title id="pi-venmo">Venmo</title>
                  <g fill="none" fillRule="evenodd">
                    <rect
                      fillOpacity=".07"
                      fill="#000"
                      width="38"
                      height="24"
                      rx="3"
                    />
                    <path
                      fill="#3D95CE"
                      d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    />
                    <path
                      d="M24.675 8.36c0 3.064-2.557 7.045-4.633 9.84h-4.74L13.4 6.57l4.151-.402 1.005 8.275c.94-1.566 2.099-4.025 2.099-5.702 0-.918-.154-1.543-.394-2.058l3.78-.783c.437.738.634 1.499.634 2.46z"
                      fill="#FFF"
                      fillRule="nonzero"
                    />
                  </g>
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 38 24"
                  width="38"
                  height="24"
                  aria-labelledby="pi-visa"
                >
                  <title id="pi-visa">Visa</title>
                  <path
                    opacity=".07"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                  />
                  <path
                    fill="#fff"
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                  />
                  <path
                    d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                    fill="#142688"
                  />
                </svg>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <p className="wn-footer__copyright">
            &copy; 2026, <a href="https://wellnessnest.co">Wellness Nest</a>
          </p>

          {/* FDA Disclaimer */}
          <p className="wn-footer__disclaimer">
            Statements made on this website have not been evaluated by the U.S.
            Food and Drug Administration. These products are not intended to
            diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>

      <style>{`
        .wn-footer {
          background-color: #fff;
          font-family: Montserrat, sans-serif;
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0.06em;
          line-height: 1.8;
          color: rgb(18, 18, 18);
        }
        @media screen and (min-width: 750px) {
          .wn-footer { font-size: 16px; }
        }

        .wn-footer__top {
          border-top: 1px solid rgba(18, 18, 18, 0.08);
        }

        .wn-footer__grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 36px 40px 40px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

        .wn-footer__heading {
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 700;
          font-size: 18px;
          line-height: 1.3;
          letter-spacing: 0.06em;
          margin: 0 0 20px 0;
          color: rgb(18, 18, 18);
        }

        .wn-footer__rte p {
          margin: 0 0 10px 0;
        }

        .wn-footer__links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .wn-footer__link {
          text-decoration: none;
          color: rgb(18, 18, 18);
          display: flex;
          align-items: center;
          padding: 5px 0;
          line-height: 1.8;
        }
        .wn-footer__link:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .wn-footer__newsletter-desc {
          margin: 0 0 20px 0;
          color: rgb(18, 18, 18);
        }

        .wn-footer__newsletter {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .wn-footer__field {
          position: relative;
        }

        .wn-footer__input {
          width: 100%;
          padding: 15px 18px 5px;
          border: 1px solid rgba(18, 18, 18, 0.55);
          border-radius: 0;
          background: transparent;
          font-family: Montserrat, sans-serif;
          font-size: 16px;
          letter-spacing: 0.04em;
          color: rgb(18, 18, 18);
          outline: none;
          box-sizing: border-box;
          appearance: none;
        }
        .wn-footer__input:focus {
          border-color: rgb(18, 18, 18);
          box-shadow: 0 0 0 1px rgb(18, 18, 18);
        }
        .wn-footer__input::placeholder {
          color: transparent;
        }

        .wn-footer__label {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
          color: rgba(18, 18, 18, 0.75);
          pointer-events: none;
          transition: all 0.2s ease;
          letter-spacing: 0.04rem;
        }
        .wn-footer__input:focus ~ .wn-footer__label,
        .wn-footer__input:not(:placeholder-shown) ~ .wn-footer__label {
          top: 8px;
          transform: translateY(0);
          font-size: 10px;
        }

        .wn-footer__submit {
          width: 100%;
          padding: 14px 20px;
          background-color: rgb(84, 185, 74);
          color: #fff;
          border: none;
          border-radius: 0;
          font-family: Montserrat, sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.1em;
          cursor: pointer;
          text-transform: none;
          transition: background-color 0.2s;
        }
        .wn-footer__submit:hover {
          background-color: rgb(74, 165, 64);
        }

        .wn-footer__bottom {
          border-top: 1px solid rgba(18, 18, 18, 0.08);
        }

        .wn-footer__bottom-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .wn-footer__payment-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .wn-footer__payment-list li {
          display: flex;
        }
        .wn-footer__payment-list svg {
          border-radius: 3px;
        }

        .wn-footer__copyright {
          font-size: 12px;
          color: rgba(18, 18, 18, 0.75);
          margin: 0;
          text-align: center;
          width: 100%;
        }
        .wn-footer__copyright a {
          color: inherit;
          text-decoration: none;
        }
        .wn-footer__copyright a:hover {
          text-decoration: underline;
        }

        .wn-footer__disclaimer {
          font-size: 11px;
          color: rgba(18, 18, 18, 0.5);
          margin: 0;
          text-align: center;
          width: 100%;
          font-style: italic;
        }

        @media (max-width: 749px) {
          .wn-footer__grid {
            grid-template-columns: 1fr 1fr;
            padding: 32px 20px;
            gap: 28px;
          }
          .wn-footer__bottom-inner {
            padding: 20px 20px;
          }
        }
        @media (max-width: 480px) {
          .wn-footer__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
