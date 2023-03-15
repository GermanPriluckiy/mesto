
export default class UserInfo {
  constructor(profileName, profileDescription) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
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
}
