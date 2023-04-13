import React, { useRef } from "react";
import { CgClose } from "react-icons/cg";
import BotSkillList from "./BotSkillList";
import BotSkillInfo from "./BotSkillInfo";
import { useBotContext } from "../../../../context/botContext";
import { useEffect } from "react";
const styles = {
  height: "100vh",
  width: "100%",
  position: "absolute",
  top: "0",
  left: 0,
  background: "rgba(0, 0, 0, 0.50)",
  zIndex: "1000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const QueryMarketPlaceSkillPopup = ({ closeHandler }) => {
  const {
    getQuerySkillList,
    queryMakarketSkillList,
    queryMakarketSkillInfo,
    switchQuerySkill,
    queryInfoLoading,
    queryListLoading,
  } = useBotContext();
  const searchInputRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(!searchInputRef.current.value) return;
    getQuerySkillList(searchInputRef.current.value);
  };

  useEffect(() => {
    getQuerySkillList();
  }, []);

  useEffect(() => {
    switchQuerySkill(queryMakarketSkillList[0]?.skill_id);
  }, [queryMakarketSkillList]);

  return (
    <div style={styles}>
      <div
        className="comp_container"
        style={{ maxWidth: "1301px", width: "100%", height: "90%" }}
      >
        <div className="comp_header">
          <div className="header_text">Skills settings</div>
          <div className="header_close_btn" onClick={() => closeHandler(false)}>
            <CgClose
              style={{ height: "26px", width: "26px", cursor: "pointer" }}
              color="var(--color-text-primary)"
            />
          </div>
        </div>
        <div className="comp_body">
          <div className="d-flex gap-3">
            <div style={{ width: "50%" }}>
              <div className="mb-3">
                <form
                  onSubmit={handleSearchSubmit}
                  className="d-flex align-items-center gap-3"
                >
                  <input
                    ref={searchInputRef}
                    style={{
                      border: "1px solid var(--color-border)",
                      padding: "10px",
                      borderRadius: "8px",
                    }}
                    type="text"
                    placeholder="Search"
                  />
                  <button className="searchSubmit_btn">Submit</button>
                </form>
              </div>
              <div
                className={`${
                  queryListLoading ? "d-flex justify-content-center" : ""
                }`}
              >
                {queryListLoading ? (
                  <div
                    style={{
                      height: "40px",
                      width: "40px",
                      textAlign: "center",
                    }}
                    className="loader"
                  ></div>
                ) : queryMakarketSkillList.length > 0 ? (
                  queryMakarketSkillList.map((skill) => (
                    <BotSkillList
                      skillId={skill.skill_id}
                      title={skill.version_name}
                      desc={skill.version_description}
                      version={skill.version}
                      img={skill.version_profile_image_url}
                      infoId={queryMakarketSkillInfo?.skill_id}
                      clickHandler={switchQuerySkill}
                      isPopup={true}
                    />
                  ))
                ) : (
                  <p>No query skills found!</p>
                )}
              </div>
            </div>

            <div style={{ width: "50%" }}>
              {queryMakarketSkillInfo && (
                <BotSkillInfo
                  isPopup={true}
                  botSkillInfo={queryMakarketSkillInfo}
                  settings={false}
                  loading={queryInfoLoading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryMarketPlaceSkillPopup;
