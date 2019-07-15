import axios from "axios";
import moment from "moment";

const fetchUrl = 'https://football-players-b31f2.firebaseio.com/players.json';

export default function () {
  return axios.get(fetchUrl)
  .then( (response) =>
      response.data.map(
          ({ contractUntil, jerseyNumber, ...player }) => {
            player.age = moment().diff(player.dateOfBirth, 'years');
            delete player.dateOfBirth;

            return player;
          }
      )
  )
  .catch(function (error) {
    console.log(error);
  });
};