import React, { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Animation from "../assets/Animation.gif";
import { FaRegCopy } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { MdDoubleArrow } from "react-icons/md";

const TextGen = () => {
  const [input, setInput] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const copyRef = useRef();

  const genAI = new GoogleGenerativeAI("AIzaSyBwBOdovCE8khJihfPwcTAmTok_1Gkejqw");

  const genText = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = input;

      const result = await model.generateContent(prompt);
      const response = result.response;

      const text = response.text();
      setInput("");
      setGeneratedText(text);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error);
      setLoading(false);
    }
  };

  const onCopyText = () => {
    copyRef.current.select();
    document.execCommand("copy");
  };

  const onRefreshText = () => {
    setGeneratedText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white max-w-3xl w-full md:w-2/3 lg:w-1/2 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Gen AI TestBot !
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <button
              className="flex items-center bg-blue-700 hover:bg-blue-600 text-gray-50 px-4 py-2 rounded-md"
              onClick={onCopyText}
            >
              Copy <FaRegCopy className="ml-2" />
            </button>
            <button
              className="flex items-center bg-red-500 hover:bg-red-400 text-gray-50 px-4 py-2 rounded-md"
              onClick={onRefreshText}
            >
              Refresh <FiRefreshCcw className="ml-2" />
            </button>
          </div>
          <div>
            {loading ? (
              <div className="flex items-center justify-center border border-gray-300 rounded-md p-4 w-full h-72">
                <img src={Animation} alt="Loading..." className="w-26 h-22" />
              </div>
            ) : (
              <textarea
                className="border border-gray-300 rounded-md p-4 w-full h-72 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={generatedText}
                readOnly
                placeholder="Solution will appear here..."
                ref={copyRef}
              ></textarea>
            )}
          </div>
        </div>

        <div className="flex pt-4">
          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter your prompt..."
          />
          <button
            className="flex items-center ml-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:bg-blue-600"
            onClick={genText}
          >
            Generate <MdDoubleArrow className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextGen;
