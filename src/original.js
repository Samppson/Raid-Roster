import React, { useState } from "react";

export default function App() {
  const [roster, setRoster] = useState([]);

  const handleAddPlayer = (playerInfo) => {
    setRoster([...roster, playerInfo]);
  };

  return (
    <div>
      <AddPlayer onAddPlayer={handleAddPlayer} />
      <RosterDisplay roster={roster} />
    </div>
  );
}

function RosterDisplay({ roster }) {
  return (
    <div>
      <h2>Raid Roster</h2>
      <ul>
        {roster.map((player, index) => (
          <li>
            {player.name} {player.class} {player.spec}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddPlayer({ onAddPlayer }) {
  const wowClasses = [
    "DK",
    "DH",
    "Druid",
    "Evoker",
    "Hunter",
    "Mage",
    "Monk",
    "Paladin",
    "Priest",
    "Rogue",
    "Shaman",
    "Warlock",
    "Warrior",
  ];

  const classSpecs = {
    DK: ["Blood", "Frost", "Unholy"],
    DH: ["Havoc", "Vengeance"],
    Druid: ["Balance", "Feral", "Guardian", "Restoration"],
    Evoker: ["Augmentation", "Devastation", "Preservation"],
    Hunter: ["BM", "Marksmanship", "Survival"],
    Mage: ["Arcane", "Fire", "Frost"],
    Monk: ["Brewmaster", "Mistweaver", "Windwalker"],
    Paladin: ["Holy", "Protection", "Retribution"],
    Priest: ["Discipline", "Holy", "Shadow"],
    Rogue: ["Assasination", "Outlaw", "Subtlety"],
    Shaman: ["Elemental", "Enhancement", "Restoration"],
    Warlock: ["Affliction", "Demonology", "Destruction"],
    Warrior: ["Arms", "Fury", "Protection"],
  };

  const [playerName, setPlayerName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("");

  const handleClass = (e) => {
    const selectedClass = e.target.value;
    setSelectedClass(selectedClass);
  };

  const handleSpec = (e) => {
    const selectedSpec = e.target.value;
    setSelectedSpec(selectedSpec);
  };

  const handleName = (e) => {
    setPlayerName(e.target.value);
  };

  const handleAddPlayer = () => {
    if (playerName.trim() !== "" && selectedClass && selectedSpec) {
      const playerInfo = {
        name: playerName,
        class: selectedClass,
        spec: selectedSpec,
      };
      onAddPlayer(playerInfo);
      setPlayerName("");
      setSelectedClass("");
      setSelectedSpec("");
    }
  };

  return (
    <div>
      <div>
        <h2> Add a Player</h2>
        <label>Name: </label>
        <input type="text" value={playerName} onChange={handleName}></input>
        <select onChange={handleClass}>
          <option value="">Select a class</option>
          {wowClasses.map((wowClass, index) => (
            <option key={index} value={wowClass}>
              {wowClass}
            </option>
          ))}
        </select>
      </div>

      {selectedClass && classSpecs[selectedClass] && (
        <div>
          <select onChange={handleSpec} value={selectedSpec}>
            <option value="">Choose Spec</option>
            {classSpecs[selectedClass].map((spec, index) => (
              <option>{spec}</option>
            ))}
          </select>
        </div>
      )}

      <button onClick={handleAddPlayer}>Add Player</button>
    </div>
  );
}
