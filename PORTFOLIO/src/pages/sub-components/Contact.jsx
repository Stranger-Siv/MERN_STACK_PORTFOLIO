import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";
import { API_BASE } from "@/lib/api";
import { toast } from "react-toastify";

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(
        `${API_BASE}/api/v1/message/send`,
        { senderName, subject, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setSenderName("");
        setSubject("");
        setMessage("");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <>
      <section className="relative bg-[#1a1a1a] py-10 text-gray-300">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative">
            {/* Decorative Element */}
            <div className="absolute -left-8 -top-8 w-16 h-16 animate-spin-slow">
              <svg viewBox="0 0 100 100" className="text-gray-500">
                <path
                  d="M50,0 a50,50 0 1,1 0,100 a50,50 0 1,1 0,-100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray="1,14"
                />
              </svg>
            </div>

            {/* Heading */}
            <div className="flex flex-col items-start">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider text-white">
                CONTACT <span className="text-gray-500">ME</span>
              </h2>
              <div className="mt-4 h-1 w-20 bg-gradient-to-r from-gray-500 to-transparent"></div>
            </div>

            {/* Contact Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-[#1a1a1a]/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
                  <h3 className="text-xl font-medium mb-6 text-gray-200">Let's Connect</h3>
                  <p className="text-gray-400 mb-6">
                    I'm currently available for freelance work or full-time positions.
                    Feel free to reach out if you have any questions or want to work together.
                  </p>
                  <div className="space-y-4">
                    <p className="text-gray-400">📧 programmersiv21@gmail.com</p>
                    <p className="text-gray-400">📍 Gujarat, India</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-[#1a1a1a]/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
                <form onSubmit={handleMessage} className="space-y-6">
                  <div>
                    <Label className="text-gray-200">Your Name</Label>
                    <Input
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Your Name"
                      className="mt-2 bg-[#232323] border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-200">Subject</Label>
                    <Input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Subject"
                      className="mt-2 bg-[#232323] border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-200">Message</Label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your Message"
                      rows="5"
                      className="w-full mt-2 bg-[#232323] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-700"
                    />
                  </div>

                  <div className="flex justify-end">
                    {!loading ? (
                      <Button className="w-full sm:w-52 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800">
                        SEND MESSAGE
                      </Button>
                    ) : (
                      <button
                        disabled
                        type="button"
                        className="w-full sm:w-52 text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center"
                      >
                        <svg className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none">
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
                            fill="#E5E7EB"
                          />
                        </svg>
                        Sending...
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="text-center py-4 text-gray-400 border-t border-gray-800">
        © {new Date().getFullYear()} All rights reserved. Made with ❤️
      </footer>
    </>
  );
};

export default Contact;
