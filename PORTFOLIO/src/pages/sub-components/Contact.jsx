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

            <div className="flex flex-col items-start">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider text-white">
                CONTACT <span className="text-gray-500">ME</span>
              </h2>
              <div className="mt-4 h-0.5 w-20 bg-gradient-to-r from-gray-500 to-transparent" aria-hidden />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
              <div className="space-y-8">
                <div className="bg-[#1a1a1a]/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
                  <h3 className="text-xl font-semibold mb-6 text-white">Let&apos;s connect</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Open to freelance and full-time opportunities. Drop a line if you&apos;d like to collaborate or just say hi.
                  </p>
                  <div className="space-y-4">
                    <p className="text-gray-400">📧 programmersiv21@gmail.com</p>
                    <p className="text-gray-400">📍 Gujarat, India</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-[#1a1a1a]/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
                <form onSubmit={handleMessage} className="space-y-6">
                  <div>
                    <Label className="text-gray-300 font-medium">Your name</Label>
                    <Input
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Alex"
                      className="mt-2 bg-[#232323] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-gray-500 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300 font-medium">Subject</Label>
                    <Input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="What's this about?"
                      className="mt-2 bg-[#232323] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-gray-500 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300 font-medium">Message</Label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your message..."
                      rows="5"
                      className="w-full mt-2 bg-[#232323] rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/50 border border-gray-700 transition-shadow"
                      required
                    />
                  </div>

                  <div className="flex justify-end">
                    {!loading ? (
                      <Button type="submit" className="w-full sm:w-52 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                        Send message
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
      <footer className="text-center py-8 text-gray-500 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} All rights reserved. Built with care.
      </footer>
    </>
  );
};

export default Contact;
