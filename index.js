const COHORT = "2411-ftb-et-web-pt-SAA"
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
    partys: [],
};

const fetchAllPartys = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
  
      state.partys = json.data;

      renderAllPartys();

    } catch (error) {
      console.log("Error in the fetchAllPartys", error);
    }
  };

  const createNewParty = async (name, description, date, location) => {
    try {
        
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          name,
          description,
          date: new Date(date).toISOString(),
          location,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      await fetchAllPartys();
    } catch (error) {
      console.log("ERROR in createNewParty", error);
    }
  };

  const removeParty = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      fetchAllPartys();
    } catch (error) {
      console.log("ERROR in removeParty", error);
    }
  };

  const renderAllPartys = () => {
    const partysContainer = document.getElementById("partys-container");
    const partyList = state.partys;
  
    if (!partyList || partyList.length === 0) {
      partysContainer.innerHTML = "<h3>No Party found</h3>";
      return;
    }

    //resets html of all events
  partysContainer.innerHTML = "";

  //creates a card for each event
  partyList.forEach((party) => {
    const partyElement = document.createElement("div");
    partyElement.classList.add("party-card");
    partyElement.innerHTML = `
            <h4>${party.name}</h4>
            <p>${party.description}</p>
            <h4>${party.date}</h4>
            <p>${party.Location}</p>
            <button class="delete-button" data-id="${party.id}">Remove</button>
        `;
    partysContainer.appendChild(partyElement);

    const deleteButton = partyElement.querySelector(".delete-button");
    //add event listener to the delete button so we can delete a party
    deleteButton.addEventListener("click", (event) => {
      try {
        event.preventDefault();
        removeParty(party.id);
      } catch (error) {
        console.log(error);
      }
    });
  });
};

const addListenerToForm = () => {
  const form = document.querySelector("#new-party-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    await createNewParty(
      form.name.value,
      form.description.value,
      form.date.value,
      form.Location.Value
    );

    //clears the form  new party
    form.name.value = "";
    form.description.value = "";
    form.date.value = "";
    form.Location.value = "";
  });
  };

  const init = async () => {

    await fetchAllPartys();

    addListenerToForm();
  };
  
  init();