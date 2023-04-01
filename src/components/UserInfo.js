
export default class UserInfo {
  constructor(profileName, profileDescription, profileAvatar) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
    this._profileAvatar = document.querySelector(profileAvatar);

  }

  getUserInfo() {
    const userInformation = {
      profileName: this._profileName.textContent,
      profileDescription: this._profileDescription.textContent
    };
    return userInformation;

  }
  setUserId(id) {
    this._myId = id;

  }

  getUserId() {
    return this._myId;
  }

  setUserInfo(newName, newDescription) {
    this._profileName.textContent = newName;
    this._profileDescription.textContent = newDescription;

  }

  setUserAvatar(newAvatarLink) {
    this._profileAvatar.src = newAvatarLink;
  }
}

