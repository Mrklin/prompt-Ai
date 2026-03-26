"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const Feeds = () => {
  const [prompts, setPrompts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt", { cache: "no-store" });
      const data = await response.json();

      setPrompts(data);
    };
    fetchPrompts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return prompts.filter(
      (item) =>
        regex.test(item.creator?.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt),
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
        {data?.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText && searchedResults.length === 0 ? (
        <div className="mt-16 flex-center flex-col gap-2">
          <p className="text-2xl">😕</p>
          <p className="font-satoshi text-gray-600 text-center">
            No prompts found for{" "}
            <span className="font-semibold">"{searchText}"</span>
          </p>
          <button
            onClick={() => {
              setSearchText("");
              setSearchedResults([]);
            }}
            className="mt-2 text-sm text-primary-orange cursor-pointer underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <PromptCardList
          data={searchedResults.length > 0 ? searchedResults : prompts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  );
};

export default Feeds;
