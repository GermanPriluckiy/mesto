
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

  setUserInfo(inputName, inputDescription) {
    this._profileName.textContent = inputName;
    this._profileDescription.textContent = inputDescription;

  }

  setUserAvatar(avatarLink) {
    this._profileAvatar.src = avatarLink;
  }
}

