// App.jsx
import React, { useState } from "react";
import "./styles.css"; // Import the styles

export default function App() {
  const [roster, setRoster] = useState(() => {
    const storedRoster = localStorage.getItem("raidRoster") ?? "[]";
    return JSON.parse(storedRoster);
  });

  const handleAddPlayer = (playerInfo) => {
    setRoster((prevRoster) => {
      const newRoster = [...prevRoster, playerInfo];
      localStorage.setItem("raidRoster", JSON.stringify(newRoster));
      return newRoster;
    });
  };

  return (
    <div className="container">
      <AddPlayer onAddPlayer={handleAddPlayer} />
      <RosterDisplay roster={roster} />
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
    DK: ["Blood", "Frost DK", "Unholy"],
    DH: ["Havoc", "Vengeance"],
    Druid: ["Balance", "Feral", "Guardian", "Restoration"],
    Evoker: ["Augmentation", "Devastation", "Preservation"],
    Hunter: ["BM", "Marksmanship", "Survival"],
    Mage: ["Arcane", "Fire", "Frost Mage"],
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

  const handleAddPlayer = (e) => {
    e.preventDefault();
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
    <div className="container add-player-container">
      <div>
        <h2>Add a Player</h2>
        <form className="add-player-form">
          <label>Name:</label>
          <input type="text" value={playerName} onChange={handleName} />
          <select onChange={handleClass} value={selectedClass}>
            <option value="">Select a class</option>
            {wowClasses.map((wowClass, index) => (
              <option key={index} value={wowClass}>
                {wowClass}
              </option>
            ))}
          </select>

          {selectedClass && classSpecs[selectedClass] && (
            <div>
              <select onChange={handleSpec} value={selectedSpec}>
                <option value="">Choose Spec</option>
                {classSpecs[selectedClass].map((spec, index) => (
                  <option key={index} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button onClick={handleAddPlayer}>Add Player</button>
        </form>
      </div>
    </div>
  );
}

function RosterDisplay({ roster }) {
  const getRole = (spec) => {
    if (
      ["Blood", "Protection", "Guardian", "Brewmaster", "Vengeance"].includes(
        spec
      )
    ) {
      return "Tank";
    } else if (
      [
        "Restoration",
        "Holy",
        "Preservation",
        "Mistweaver",
        "Discipline",
      ].includes(spec)
    ) {
      return "Healer";
    } else if (
      [
        "Frost DK",
        "Unholy",
        "Havoc",
        "Feral",
        "Survival",
        "Windwalker",
        "Retribution",
        "Assasination",
        "Subtlety",
        "Outlaw",
        "Enhancement",
        "Arms",
        "Fury",
      ].includes(spec)
    ) {
      return "Melee DPS";
    } else {
      return "Ranged DPS";
    }
  };
  // Group players by role
  const groupedRoster = roster.reduce((acc, player) => {
    const { spec } = player;
    const role = getRole(spec);

    if (!acc[role]) {
      acc[role] = [];
    }

    acc[role].push(player);

    return acc;
  }, {});

  return (
    <div className="container roster-display">
      <h2>Net Loss Raid Roster</h2>
      {/* Iterate through the grouped roster and render players */}
      <div className="roster-table">
        {Object.entries(groupedRoster).map(([role, players]) => (
          <div key={role} className={`${role.toLowerCase()} column`}>
            <h3>{role}</h3>
            <ul>
              {players.map((player, index) => (
                <li
                  key={index}
                  className={`${player.class} ${role.toLowerCase()}-player`}
                >
                  <span>{player.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
