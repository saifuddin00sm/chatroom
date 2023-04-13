import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import BotSkillList from "../BotInformation/BotSkills/BotSkillList";
import "./Reusables.css";

function Paginations({ items, skillInfo, clickHandler, isPopup }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
console.log('pagination: ',currentItems)
  return (
    <>
      {currentItems.map((skill, index) => (
        <BotSkillList
          key={index}
          skillId={skill.skill_id}
          title={skill.version_name}
          desc={skill.version_description}
          version={skill.version}
          img={skill.version_profile_image_url}
          infoId={skillInfo?.skill_id}
          clickHandler={clickHandler}
          isPopup={isPopup}
        />
      ))}
      {items.length > 5 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      )}
    </>
  );
}

export default Paginations;
