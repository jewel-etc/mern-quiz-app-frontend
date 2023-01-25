import { useState, useEffect, useCallback } from 'react';
let logoutTimer;

export const useAuthContext = () => {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [favSubjectsIds, setFavSubjectsIds] = useState([]);
  const [saveSubjectsIds, setSaveSubjectsIds] = useState([])
  const [tokenExpirationDate, setTokenExpirationdate] = useState();



  const login = useCallback((userId, name, username, token, isAdmin, favIds, saveIds, expirationDate) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    let favSubjects = [], saveSubjects = [];

    if (userId === undefined && token === undefined) {

      favSubjects = (favIds)


    }
    else if (userId === null && token === null) {
      // const userData = JSON.parse(localStorage.getItem('userData'))


      if (userData) {
        favSubjects = userData.favIds;
        favSubjects.push(favIds)

      } else {

        favSubjects.push(favIds)

      }

    } else {

      favSubjects = favIds
      saveSubjects = saveIds




    }
    setUserId(userId ? userId : null);
    setName(name ? name : null);
    setUsername(username ? username : null);
    setToken(token ? token : null);
    setIsAdmin(isAdmin ? isAdmin : false);
    setFavSubjectsIds(favSubjects);
    setSaveSubjectsIds(saveSubjects);



    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 3600 * 24)

    setTokenExpirationdate(tokenExpirationDate)

    localStorage.setItem(
      'userData',
      JSON.stringify
        ({
          userId,
          name,
          username,
          token,
          isAdmin,
          favIds: favSubjects,
          saveIds: saveSubjects,
          expiration: tokenExpirationDate.toISOString()
        }))
  }, [])

  const logout = useCallback(() => {
    setUserId(null);
    setName(null);
    setUsername(null);
    setToken(null);
    setIsAdmin(false);
    setFavSubjectsIds([]);
    setSaveSubjectsIds([]);
    setTokenExpirationdate(null);
    localStorage.removeItem('userData')

  }, [])



  useEffect(() => {

    if (token && tokenExpirationDate) {



      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer);

    }

  }, [token, logout, tokenExpirationDate])

  useEffect(() => {

    const storedData = JSON.parse(localStorage.getItem('userData'));


    // let strArray = [ "q", "w", "w", "w", "e", "i", "u", "r"];

    let favIds, saveIds
    if (storedData) {

      favIds = [...new Set(storedData.favIds)];
      saveIds = [...new Set(storedData.saveIds)];

    }




    if (storedData) {

      saveIds = saveIds.filter(val => !favIds.includes(val));
      favIds = favIds.filter(val => !saveIds.includes(val));


    }


    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()) {




      login(storedData.userId,
        storedData.name,
        storedData.username,
        storedData.token,
        storedData.isAdmin,
        favIds,
        saveIds,
        new Date(storedData.expiration)

      )
    } else if (storedData && storedData.favIds.length > 0) {

      login(undefined, undefined, undefined, undefined, undefined, favIds, [], null)
    }
  }, [login])

  return [userId, name, username, token, isAdmin, favSubjectsIds, saveSubjectsIds, login, logout]

}