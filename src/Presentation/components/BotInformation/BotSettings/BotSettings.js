import { useState} from "react";
import { useBotContext } from "../../../../context/botContext";
import user_avatar from "../../../../assets/img/user_avatar_1.jpg";
import { BiEdit } from "react-icons/bi";
import "./BotSettings.css";
import AddOrEditInfo from "../../Reusables/AddOrEditInfo";


const BotSettings = () => {
  const { botInfo } = useBotContext();
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <div className="bot_info_container">
        <div className="bot_info_head">
          <h5>Profile Information</h5>
          <div
            className="d-flex align-items-center gap-2 bot_info_edit_btn"
            onClick={() => setIsEdit(true)}
          >
            <div>
              <BiEdit style={{ height: "20px", width: "20px" }} />
            </div>
            <div>
              <span>Edit</span>
            </div>
          </div>
        </div>
        <div className="bot_profile_img">
          <div className="mb-3">
            <div className="profile_tag">Profile Image</div>
            <div className="bot_profile_pic">
              <img
                src={
                  botInfo.profile_image_url
                    ? botInfo.profile_image_url
                    : user_avatar
                }
                alt="bot profile imge"
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="bot_name_tag">Bot's Name</div>
            <div className="bot_name">{botInfo?.name ? botInfo.name : ''}</div>
          </div>
          {botInfo.bio && (
            <div>
              <div className="bot_bio_tag">Bio</div>
              <p className="bot_bio mb-0">{botInfo?.bio || ''}</p>
            </div>
          )}
        </div>
      </div>
      {isEdit && (
        <AddOrEditInfo
          botName={botInfo?.name}
          botBio={botInfo?.bio}
          profile_image_url={botInfo?.profile_image_url}
          botId={botInfo?.bot_id}
          closeHandler={setIsEdit}
          headerText='Profile Information'
          apiType='update'
        />
      )}
    </>
  );
};

export default BotSettings;
