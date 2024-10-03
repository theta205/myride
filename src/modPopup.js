import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './page.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';

const PopupForMods = ({ trigger,modtype }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [theModType, setTheModType] = useState(''); // State for selected mod type
    const [selectedMod, setSelectedMod] = useState(''); // State for selected mod

    // Handle open state to apply animation
    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setTheModType(''); // Reset selected mod type on close
        setSelectedMod(''); // Reset selected mod on close
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
            { id: 1, content: "Custom Exhaust" },
            { id: 2, content: "Cat-Back Exhaust" },
            { id: 3, content: "Axle-Back Exhaust" },
            { id: 4, content: "Performance Catalytic Converter" },
            { id: 5, content: "Catalytic Converter Delete" },
            { id: 6, content: "Headers" },
            { id: 7, content: "Downpipe" },
            { id: 8, content: "Muffler Delete" },
            { id: 9, content: "Resonator Delete" },
            { id: 10, content: "Exhaust Tips" },
            { id: 11, content: "Exhaust Flame Kit" }
        ],
        Cooling: [
            { id: 1, content: "Radiator" },
            { id: 2, content: "Oil Cooler" },
            { id: 3, content: "Transmission Cooler" },
            { id: 4, content: "Intercooler" }
        ],
        Drivetrain: [
            { id: 1, content: "Lightweight Flywheel" },
            { id: 2, content: "Clutch Upgrade" },
            { id: 3, content: "Limited Slip Differential (LSD)" },
            { id: 4, content: "Short Shifter" },
            { id: 5, content: "Transmission Cooler" },
            { id: 6, content: "Longer Gear Ratio" },
            { id: 7, content: "Shorter Gear Ratio" },
            { id: 8, content: "Manual Transmission Swap" },
            { id: 9, content: "Differential Lockers" },
            { id: 10, content: "Upgraded Driveshaft" }
        ],
        Suspension: [
            { id: 1, content: "Coilovers" },
            { id: 2, content: "Lowering Springs" },
            { id: 3, content: "Strut Tower Brace" },
            { id: 4, content: "Sway Bars" },
            { id: 5, content: "Camber Kits" },
            { id: 6, content: "Angler Kits" },
            { id: 7, content: "Control Arms" },
            { id: 8, content: "Polyurethane Bushings" },
            { id: 9, content: "Shocks" },
            { id: 10, content: "Upgraded Subframe/Chassis Bracing" },
            { id: 11, content: "Roll Cage" },
            { id: 12, content: "Wheel Spacers" }
        ],
        Braking: [
            { id: 1, content: "Big Brake Kit (BBK)" },
            { id: 2, content: "Slotted/Drilled Brake Rotors" },
            { id: 3, content: "Carbon Ceramic Brakes" },
            { id: 4, content: "Upgraded Brake Caliper" }
        ],
        Wheels: [
            { id: 1, content: "Rims" },
            { id: 2, content: "Tires" }
        ],
        Offroad: [
            { id: 1, content: "Lift Kit" },
            { id: 2, content: "Skid Plates" },
            { id: 3, content: "Rock Sliders" },
            { id: 4, content: "Bumpers (Front/Rear)" },
            { id: 5, content: "Winch" },
            { id: 6, content: "Sway Bar Disconnects" },
            { id: 7, content: "Air Compressor" },
            { id: 8, content: "Snorkel" },
            { id: 9, content: "Light Bars/Offroad Lights" },
            { id: 10, content: "Mud Flaps" }
        ],
        Exterior: [
            { id: 1, content: "Custom Paint Job" },
            { id: 2, content: "Vinyl Wrap" },
            { id: 3, content: "Body Kit" },
            { id: 4, content: "Widebody Kit" },
            { id: 5, content: "Front Lip Spoiler" },
            { id: 6, content: "Rear Diffuser" },
            { id: 7, content: "Side Skirts" },
            { id: 8, content: "Fender Flares" },
            { id: 9, content: "Carbon Fiber" },
            { id: 10, content: "Aftermarket Headlights" },
            { id: 11, content: "Aftermarket Taillights" },
            { id: 12, content: "Rims" },
            { id: 13, content: "Wheel Painting/Coating" },
            { id: 14, content: "Mud Flaps" },
            { id: 15, content: "Roof Rack" },
            { id: 16, content: "Spoiler" },
            { id: 17, content: "Lip" },
            { id: 18, content: "Wing" },
            { id: 19, content: "Custom Grill" },
            { id: 20, content: "Exhaust Tips" },
            { id: 21, content: "Louvers" }
        ],
        Interior: [
            { id: 1, content: "Interior Lighting" },
            { id: 2, content: "Custom Floor Mats" },
            { id: 3, content: "Shift Knob" },
            { id: 4, content: "Gauges" },
            { id: 5, content: "Racing Seats" },
            { id: 6, content: "Alcantara Trim" },
            { id: 7, content: "Custom Shifter" },
            { id: 8, content: "Illuminated Door Sills" },
            { id: 9, content: "Sound System" }
        ],
        Lighting: [
            { id: 1, content: "Aftermarket Headlights" },
            { id: 2, content: "Aftermarket Taillights" },
            { id: 3, content: "Underbody Neon Lights" },
            { id: 4, content: "Wheel Well Lighting" }
        ],
        Misc: [
            { id: 1, content: "Window Tint" },
            { id: 2, content: "Sunshade/Window Visors" },
            { id: 3, content: "Mirrors Caps" },
            { id: 4, content: "Engine Bay Dress-Up Kit" },
            { id: 5, content: "Sound Deadening Material" },
            { id: 6, content: "Carplay" },
            { id: 7, content: "Upgraded Infotainment" },
            { id: 8, content: "Fuel Cap Cover" }
        ]
    };    
    let type = modtype ? ["Engine", "Exhaust", "Cooling","Drivetrain", "Suspension","Braking", "Wheels", "Offroad", "Other"] : ["Exterior", "Interior","Lighting", "Misc", "Other"]
    const getMods = (type) => {
        const selectedMods = carMods[type] || [];
        selectedMods.sort((a, b) => a.content.localeCompare(b.content));
        return selectedMods; // Return sorted mods
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
                height: '300px',
                color: 'white',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                display: 'flex',
                transform: isOpen ? 'translateY(-67px)' : 'translateY(0px)', // Move up on open
                opacity: isOpen ? 1 : 0,
            }}
        >
            <div className="popup-title-div" style={{ justifyContent: 'center', width: "90%", height: "50px", color: 'black', background: "white" }}>
                <h3>Enter Your Mods Info</h3>
                <Row>
                    <Col>
                        <label htmlFor="modType" style={{ paddingBottom: '8px' }}>Mod Type: </label>
                        <Form.Select
                            name="setmodtypes"
                            required
                            style={{ backgroundColor: 'rgb(110,117,124)', color: 'white', width: '100%', height: '40px' }}
                            value={theModType}
                            onChange={(e) => {
                                setTheModType(e.target.value);
                                setSelectedMod(''); // Reset selected mod when type changes
                            }}
                        >
                            <option value="">Select</option> {/* Default empty option */}
                            {type.map((row) => (
                                <option key={row} value={row}>{row}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                        <label htmlFor="mod" style={{ paddingBottom: '8px' }}>Mod: </label>
                        <Form.Select
                            name="setmods"
                            required
                            style={{ backgroundColor: 'rgb(110,117,124)', color: 'white', width: '100%', height: '40px' }}
                            value={selectedMod}
                            onChange={(e) => setSelectedMod(e.target.value)} // Update selected mod
                            disabled={!theModType} // Disable if no mod type is selected
                        >
                            <option value="">Select</option> {/* Default empty option */}
                            {getMods(theModType).map((row) => (
                                <option key={row.id} value={row.content}>{row.content}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>
            </div>
        </Popup>
    );
};

export default PopupForMods;