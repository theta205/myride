import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './page.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';

const PopupForMods = ({ trigger, modtype, onSub }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [theModType, setTheModType] = useState(''); // State for selected mod type
    const [selectedMod, setSelectedMod] = useState(''); // State for selected mod
    const [modList, setModList] = useState([]); // Array to store selected mods
    const [details, setDetails] = useState(''); // State for selected mod

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setTheModType(''); 
        setSelectedMod(''); 
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        if (theModType && selectedMod) {
            // Add selected mod to modList array
            setModList((prevMods) => [...prevMods, {  type: modtype, mod: selectedMod, details: details}]);
            console.log(modList)
            if (onSub) {
                onSub([...modList, { type: modtype, mod: selectedMod, details: details}]);
                
            }
            handleClose();
        }
    };

    const carMods = {
        Engine: [
          { id: 1, content: "Cold Air Intake" },
          { id: 2, content: "Ram Air Intake" },
          { id: 3, content: "Turbocharger" },
          { id: 4, content: "Supercharger" },
          { id: 5, content: "Intercooler" },
          { id: 6, content: "Nitrous Kit" },
          { id: 7, content: "Intake Manifold" },
          { id: 8, content: "Fuel Injectors" },
          { id: 9, content: "Fuel Pump" },
          { id: 10, content: "Fuel Rail" },
          { id: 11, content: "High-Flow Fuel Lines" },
          { id: 12, content: "Camshaft" },
          { id: 13, content: "Valve Springs" },
          { id: 14, content: "Pistons" },
          { id: 15, content: "Forged Rods" },
          { id: 16, content: "Stroker Kit" },
          { id: 17, content: "Oil Catch Can" },
          { id: 18, content: "Blow-Off Valve" },
          { id: 19, content: "Boost Controller" },
          { id: 20, content: "Throttle Controller" },
          { id: 21, content: "ECU Tune" },
          { id: 22, content: "Water/Methanol Injection Kit" }
        ],
        Exhaust: [
          { id: 23, content: "Custom Exhaust" },
          { id: 24, content: "Cat-Back Exhaust" },
          { id: 25, content: "Axle-Back Exhaust" },
          { id: 26, content: "Performance Catalytic Converter" },
          { id: 27, content: "Catalytic Converter Delete" },
          { id: 28, content: "Headers" },
          { id: 29, content: "Downpipe" },
          { id: 30, content: "Muffler Delete" },
          { id: 31, content: "Resonator Delete" },
          { id: 32, content: "Exhaust Tips" },
          { id: 33, content: "Exhaust Flame Kit" }
        ],
        Cooling: [
          { id: 34, content: "Radiator" },
          { id: 35, content: "Oil Cooler" },
          { id: 36, content: "Transmission Cooler" },
          { id: 37, content: "Intercooler" }
        ],
        Drivetrain: [
          { id: 38, content: "Lightweight Flywheel" },
          { id: 39, content: "Clutch Upgrade" },
          { id: 40, content: "Limited Slip Differential (LSD)" },
          { id: 41, content: "Short Shifter" },
          { id: 42, content: "Transmission Cooler" },
          { id: 43, content: "Longer Gear Ratio" },
          { id: 44, content: "Shorter Gear Ratio" },
          { id: 45, content: "Manual Transmission Swap" },
          { id: 46, content: "Differential Lockers" },
          { id: 47, content: "Upgraded Driveshaft" }
        ],
        Suspension: [
          { id: 48, content: "Coilovers" },
          { id: 49, content: "Lowering Springs" },
          { id: 50, content: "Strut Tower Brace" },
          { id: 51, content: "Sway Bars" },
          { id: 52, content: "Camber Kits" },
          { id: 53, content: "Angler Kits" },
          { id: 54, content: "Control Arms" },
          { id: 55, content: "Polyurethane Bushings" },
          { id: 56, content: "Shocks" },
          { id: 57, content: "Upgraded Subframe/Chassis Bracing" },
          { id: 58, content: "Roll Cage" },
          { id: 59, content: "Wheel Spacers" }
        ],
        Braking: [
          { id: 60, content: "Big Brake Kit (BBK)" },
          { id: 61, content: "Slotted/Drilled Brake Rotors" },
          { id: 62, content: "Carbon Ceramic Brakes" },
          { id: 63, content: "Upgraded Brake Caliper" }
        ],
        Wheels: [
          { id: 64, content: "Rims" },
          { id: 65, content: "Tires" }
        ],
        Offroad: [
          { id: 66, content: "Lift Kit" },
          { id: 67, content: "Skid Plates" },
          { id: 68, content: "Rock Sliders" },
          { id: 69, content: "Bumpers (Front/Rear)" },
          { id: 70, content: "Winch" },
          { id: 71, content: "Sway Bar Disconnects" },
          { id: 72, content: "Air Compressor" },
          { id: 73, content: "Snorkel" },
          { id: 74, content: "Light Bars/Offroad Lights" },
          { id: 75, content: "Mud Flaps" }
        ],
        Exterior: [
          { id: 76, content: "Custom Paint Job" },
          { id: 77, content: "Vinyl Wrap" },
          { id: 78, content: "Body Kit" },
          { id: 79, content: "Widebody Kit" },
          { id: 80, content: "Front Lip Spoiler" },
          { id: 81, content: "Rear Diffuser" },
          { id: 82, content: "Side Skirts" },
          { id: 83, content: "Fender Flares" },
          { id: 84, content: "Carbon Fiber" },
          { id: 85, content: "Aftermarket Headlights" },
          { id: 86, content: "Aftermarket Taillights" },
          { id: 87, content: "Rims" },
          { id: 88, content: "Wheel Painting/Coating" },
          { id: 89, content: "Mud Flaps" },
          { id: 90, content: "Roof Rack" },
          { id: 91, content: "Spoiler" },
          { id: 92, content: "Lip" },
          { id: 93, content: "Wing" },
          { id: 94, content: "Custom Grill" },
          { id: 95, content: "Exhaust Tips" },
          { id: 96, content: "Louvers" }
        ],
        Interior: [
          { id: 97, content: "Interior Lighting" },
          { id: 98, content: "Custom Floor Mats" },
          { id: 99, content: "Shift Knob" },
          { id: 100, content: "Gauges" },
          { id: 101, content: "Racing Seats" },
          { id: 102, content: "Alcantara Trim" },
          { id: 103, content: "Custom Shifter" },
          { id: 104, content: "Illuminated Door Sills" },
          { id: 105, content: "Sound System" }
        ],
        Lighting: [
          { id: 106, content: "Aftermarket Headlights" },
          { id: 107, content: "Aftermarket Taillights" },
          { id: 108, content: "Underbody Neon Lights" },
          { id: 109, content: "Wheel Well Lighting" }
        ],
        Misc: [
          { id: 110, content: "Window Tint" },
          { id: 111, content: "Sunshade/Window Visors" },
          { id: 112, content: "Mirrors Caps" },
          { id: 113, content: "Engine Bay Dress-Up Kit" },
          { id: 114, content: "Sound Deadening Material" },
          { id: 115, content: "Carplay" },
          { id: 116, content: "Upgraded Infotainment" },
          { id: 117, content: "Fuel Cap Cover" }
        ]
      };
    let otherNum = 200;
    let type = modtype ? ["Engine", "Exhaust", "Cooling", "Drivetrain", "Suspension", "Braking", "Wheels", "Offroad", "Other"] : ["Exterior", "Interior", "Lighting", "Misc", "Other"];
    
    const getMods = (type) => {
        const selectedMods = carMods[type] || [];
        selectedMods.sort((a, b) => a.content.localeCompare(b.content));
        return selectedMods;
    };

    return (
        <Popup
            trigger={trigger}
            onOpen={handleOpen}
            onClose={handleClose}
            className="popup-content"
            position="bottom center"
            closeOnDocumentClick
            contentStyle={{
                alignContent: 'center',
                justifyContent: 'center',
                height: 'auto',
                color: 'white',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                display: 'flex',
                transform: isOpen ? 'translateY(-67px)' : 'translateY(0px)', 
                opacity: isOpen ? 1 : 0,
            }}
        >
            <div style={{ justifyContent: 'center', width: "90%", height: "auto", color: 'black', background: "white" }}>
                <div><h3>Enter Your Mods Info</h3></div>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Select
                            name="setmodtypes"
                            required
                            style={{ marginTop: '3px', marginBottom: '3px', backgroundColor: 'rgb(110,117,124)', color: 'white', width: '100%', height: '44px' }}
                            value={theModType}
                            onChange={(e) => {
                                setTheModType(e.target.value);
                                setSelectedMod("Other"); 
                            }}
                        >
                            <option value="">Mod Categories</option> 
                            {type.map((row) => (
                                <option key={row} value={row}>{row}</option>
                            ))}
                        </Form.Select>
                    </Row>
                    <Row>
                        <Form.Select
                            name="setmods"
                            required
                            style={{ marginTop: '3px', marginBottom: '3px', backgroundColor: 'rgb(110,117,124)', color: 'white', width: '100%', height: '44px' }}
                            value={selectedMod}
                            onChange={(e) => setSelectedMod(e.target.value)} 
                            disabled={!theModType} 
                        >
                            {theModType !== "Other" && <option value="">Mods</option>}
                            {theModType === "Other" && <option value="Other">Other</option>}
                            {theModType !== "Other" && getMods(theModType).map((row) => (
                                <option key={row.id} value={row.content}>{row.content}</option>
                            ))}
                        </Form.Select>
                    </Row>
                    <Row style={{ justifyContent: 'center' }}>
                        {theModType === "Other" && (
                            <input
                                type="text"
                                className="otherModInput"
                                name="otherModInput"
                                style={{ width: '100%', height: '37px', borderRadius: '5px' }}
                                placeholder="Type your custom mod"
                                onChange={(e) => setSelectedMod(e.target.value)}
                                required
                            />
                        )}
                    </Row>
                    <Row style={{ justifyContent: 'center' }}>
                        <input
                            type="text"
                            className="otherModInput"
                            name="otherModInput"
                            style={{ width: '100%', height: '37px', borderRadius: '5px' }}
                            placeholder="Details (Brand, Product, etc)"
                            onChange={(e) => setDetails(e.target.value)}
                        />
                       
                    </Row>
                    <Row style={{ justifyContent: 'center' }}>
                        <button type="submit" className="popup-content-button" style={{ width: '100%' }}>
                            Submit
                        </button>
                    </Row>
                </form>
            </div>
        </Popup>
    );
};

export default PopupForMods;