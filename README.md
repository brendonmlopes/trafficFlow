# trafficFlowJS🚗

**trafficFlowJS** is a JavaScript-based simulation for modeling traffic flow using differential equations. Created by **Brendon Lopes** (GitHub user: [brendonmlopes](https://github.com/brendonmlopes)), the project provides a visually engaging way to study and simulate dynamic traffic patterns using **p5.js**.

---

## 🌟 Features

- **Multi-lane Traffic Simulation**: Create multiple lanes of traffic with configurable parameters.
- **Dynamic Entity Interactions**: Entities (vehicles) interact dynamically, with speed and position influenced by their lane and other entities.
- **Customizable Transport Matrix**: The transport matrix controls inter-lane interactions and flow behavior.
- **Differential Equation Integration**: Traffic dynamics are modeled using equations to reflect realistic patterns.
- **Visual Output**: The simulation is displayed in a graphical window with real-time updates.

---

## 🖼️ Screenshots

![trafficFlowJS](https://github.com/user-attachments/assets/34309758-e5ef-45aa-a06c-b309e0af376a)

> _A screenshot of trafficFlowJS running with dynamic entities moving through lanes._

---
---

## 📜 Mathematical Explanation

While driving and stuck in traffic, I caught myself wondering if there was an optimal lane or strategy to optimize my time through traffic. So I sat down and came up with a formula (I know there are studies on this already, this project is just a personal way for my mind trying to keep itself occupied during traffic). The simulation is based on a differential equation that models the population dynamics in each lane. The equation is as follows:

![png](https://github.com/user-attachments/assets/a4a149bf-4c6b-4a9c-847c-812906e2b90a)


### Explanation of Terms


1. **![CodeCogsEqn (2)](https://github.com/user-attachments/assets/4b1c2050-326d-42c4-811e-9606f0eb6868)**: Population in the \(i\)-th lane (starting from the left-most lane). This represents the number of entities (e.g., vehicles) in lane \(i\).


2. **![dpdt](https://github.com/user-attachments/assets/cf239905-e9d0-4b0b-bd24-05514f1d1de3)**: The rate of change of population in the \(i\)-th lane over time.

3. ![CodeCogsEqn (8)](https://github.com/user-attachments/assets/00895fcb-8f83-4450-9bd7-56e104680a42) : Represents the inflow of population into the \(i\)-th lane from the adjacent lanes (\(i-1\) and \(i+1\)). The constants \(k_{i-1, i}\) and \(k_{i+1, i}\) determine the strength of this interaction, while \(v_i\) is the velocity in the \(i\)-th lane.

4.![CodeCogsEqn (10)](https://github.com/user-attachments/assets/401dd6cc-6165-4272-8c97-9684b5a73db3) : Models the decay of population within the \(i\)-th lane due to internal factors, where \(\alpha_i\) is a decay constant.

5.![CodeCogsEqn (11)](https://github.com/user-attachments/assets/aea33024-79ae-439d-883c-68f5a34f54ad) : Represents the outflow of population from the \(i\)-th lane to adjacent lanes. The constants \(k_{i, i-1}\) and \(k_{i, i+1}\) regulate this outflow, while \(v_{i-1}\) and \(v_{i+1}\) are the velocities in the neighboring lanes.

6. \( ![CodeCogsEqn (5)](https://github.com/user-attachments/assets/f033507b-58c4-4968-bdfe-9b00d0e3aaa5) , ![CodeCogsEqn (6)](https://github.com/user-attachments/assets/c1562504-5d78-4907-aed1-554221bfba17) : Accounts for external factors influencing the lane. Here:
   - ![CodeCogsEqn (5)](https://github.com/user-attachments/assets/f033507b-58c4-4968-bdfe-9b00d0e3aaa5): Positive external influences, such as increased demand in the lane.
   - ![CodeCogsEqn (6)](https://github.com/user-attachments/assets/c1562504-5d78-4907-aed1-554221bfba17): Negative external influences, such as disturbances or obstructions.

### Key Insights

- The model ensures that population dynamics are influenced by interactions with adjacent lanes, internal lane properties, and external factors.
- The balance between inflows and outflows governs the stability or instability of population in each lane.
- By tweaking the constants (\(k\), \(\alpha\), \(\epsilon\), \(\sigma\)), you can simulate different traffic scenarios, such as congestion, free flow, or lane switching effects.

This equation is solved iteratively in the simulation to update the population in each lane over time, providing a dynamic visualization of traffic flow.

## 🚀 Getting Started

### Prerequisites

- **p5.js Library**: Download or include the [p5.js library](https://p5js.org/).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/brendonmlopes/trafficFlowJS.git
   
2. Navigate to the directory
   ```bash
    cd trafficFlow

3. Open `index.html` in your browser to run the simulation.

---

## 🎮 How to Use

- **Simulation Display**: Each lane and its entities (vehicles) are visualized dynamically.
- **Customizing Lanes**: Modify the `nLanes` variable to adjust the number of lanes.
- **Entity Behavior**: Entity speeds are influenced by their lane and random noise (`sNoise`).

---

## 📜 How It Works

### Core Components

1. **Transport Matrix (`k`)**:
   - Models the interaction between lanes and entities.
   - Contains parameters for flow dynamics such as speed adjustments and transfer rates.

2. **Lanes**:
   - Represent sections of the traffic system.
   - Entities move within lanes, with speeds defined by the lane's properties.

3. **Entities**:
   - Represent individual vehicles in the simulation.
   - Dynamics include speed, position, and interaction with lane parameters.

### Differential Equation Model

The traffic flow is calculated for each lane using the following dynamics:
- Population change (`pop`) is influenced by:
  - Inflow from neighboring lanes.
  - Outflow based on lane-specific parameters.
  - Additional noise and modifiers (`epsilon`, `sigma`, `alpha`).

---

## 🛠️ Configuration

### Key Variables

- `nLanes`: Number of lanes.
- `dt`: Time delta for simulation updates.
- `sNoise`: Speed noise affecting entity behavior.

### Transport Matrix

Modify the transport matrix (`k`) to customize lane interactions:
- `[k[i][0]]`: Multiplier of cars coming from the previous lane to the ith lane.
- `[k[i][1]]`: Multiplier of cars coming from the next lane to the ith lane.
- `[k[i][2]]`: Multiplier of cars going from the ith lane to the previous lane.
- `[k[i][3]]`: Multiplier of cars going from the ith lane to the next lane.
-![Uploading CodeCogsEqn (4).png…]()`[k[i][4]]`: Lane-specific decay factor, a multiplier of how "satisfied" the driver on the ith lane is being there.
- `[k[i][5]]` & `[k[i][6]]`: epsilon and sigma.

---

## 📷 Visual Customization

- Adjust the appearance of entities by modifying the `show()` method in the `Entity` class.
- Change the background and lane visualizations in the `draw()` function.

---

## 🤝 Contributions

Contributions are welcome!
