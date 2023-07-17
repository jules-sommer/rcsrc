"use client"

import React, { createRef, useEffect, useRef } from "react";
import SmilesDrawer from "smiles-drawer";

export const SmileDrawerContainer = ({ smiles, theme='github', height = '256px', width = '256px', className }) => {

    const canvasRef = useRef();

    const options = {
        "scale": 0,
        "bondThickness": 2,
        "shortBondLength": 0.8,
        "bondSpacing": 5.3000000000000005,
        "atomVisualization": "default",
        "isomeric": true,
        "debug": false,
        "terminalCarbons": false,
        "explicitHydrogens": true,
        "overlapSensitivity": 0.42,
        "overlapResolutionIterations": 1,
        "compactDrawing": true,
        "fontFamily": "Arial, Helvetica, sans-serif",
        "fontSizeLarge": 11,
        "fontSizeSmall": 3,
        "padding": 2,
        "experimentalSSSR": true,
        "kkThreshold": 0.1,
        "kkInnerThreshold": 0.1,
        "kkMaxIteration": 20000,
        "kkMaxInnerIteration": 50,
        "kkMaxEnergy": 1000000000,
        "themes": {
            "dark": {
                "C": "#fff",
                "O": "#e74c3c",
                "N": "#3498db",
                "F": "#27ae60",
                "CL": "#16a085",
                "BR": "#d35400",
                "I": "#8e44ad",
                "P": "#d35400",
                "S": "#f1c40f",
                "B": "#e67e22",
                "SI": "#e67e22",
                "H": "#aaa",
                "BACKGROUND": "transparent"
            },
            "light": {
                "C": "#222",
                "O": "#e74c3c",
                "N": "#3498db",
                "F": "#27ae60",
                "CL": "#16a085",
                "BR": "#d35400",
                "I": "#8e44ad",
                "P": "#d35400",
                "S": "#f1c40f",
                "B": "#e67e22",
                "SI": "#e67e22",
                "H": "#666",
                "BACKGROUND": "transparent"
            },
            "oldschool": {
                "C": "#000",
                "O": "#000",
                "N": "#000",
                "F": "#000",
                "CL": "#000",
                "BR": "#000",
                "I": "#000",
                "P": "#000",
                "S": "#000",
                "B": "#000",
                "SI": "#000",
                "H": "#000",
                "BACKGROUND": "transparent"
            },
            "solarized": {
                "C": "#586e75",
                "O": "#dc322f",
                "N": "#268bd2",
                "F": "#859900",
                "CL": "#16a085",
                "BR": "#cb4b16",
                "I": "#6c71c4",
                "P": "#d33682",
                "S": "#b58900",
                "B": "#2aa198",
                "SI": "#2aa198",
                "H": "#657b83",
                "BACKGROUND": "transparent"
            },
            "solarized-dark": {
                "C": "#93a1a1",
                "O": "#dc322f",
                "N": "#268bd2",
                "F": "#859900",
                "CL": "#16a085",
                "BR": "#cb4b16",
                "I": "#6c71c4",
                "P": "#d33682",
                "S": "#b58900",
                "B": "#2aa198",
                "SI": "#2aa198",
                "H": "#839496",
                "BACKGROUND": "transparent"
            },
            "matrix": {
                "C": "#678c61",
                "O": "#2fc079",
                "N": "#4f7e7e",
                "F": "#90d762",
                "CL": "#82d967",
                "BR": "#23755a",
                "I": "#409931",
                "P": "#c1ff8a",
                "S": "#faff00",
                "B": "#50b45a",
                "SI": "#409931",
                "H": "#426644",
                "BACKGROUND": "transparent"
            },
            "github": {
                "C": "#24292f",
                "O": "#cf222e",
                "N": "#0969da",
                "F": "#2da44e",
                "CL": "#4d8939",
                "BR": "#bc4c00",
                "I": "#8250df",
                "P": "#bf3989",
                "S": "#d4a72c",
                "B": "#fb8f44",
                "SI": "#bc4c00",
                "H": "#57606a",
                "BACKGROUND": "transparent"
            },
            "carbon": {
                "C": "#161616",
                "O": "#da1e28",
                "N": "#0f62fe",
                "F": "#198038",
                "CL": "#007d79",
                "BR": "#fa4d56",
                "I": "#8a3ffc",
                "P": "#ff832b",
                "S": "#f1c21b",
                "B": "#8a3800",
                "SI": "#e67e22",
                "H": "#525252",
                "BACKGROUND": "transparent"
            },
            "cyberpunk": {
                "C": "#ea00d9",
                "O": "#ff3131",
                "N": "#0abdc6",
                "F": "#00ff9f",
                "CL": "#00fe00",
                "BR": "#fe9f20",
                "I": "#ff00ff",
                "P": "#fe7f00",
                "S": "#fcee0c",
                "B": "#ff00ff",
                "SI": "#ffffff",
                "H": "#913cb1",
                "BACKGROUND": "transparent"
            },
            "gruvbox": {
                "C": "#665c54",
                "O": "#cc241d",
                "N": "#458588",
                "F": "#98971a",
                "CL": "#79740e",
                "BR": "#d65d0e",
                "I": "#b16286",
                "P": "#af3a03",
                "S": "#d79921",
                "B": "#689d6a",
                "SI": "#427b58",
                "H": "#7c6f64",
                "BACKGROUND": "transparent"
            },
            "gruvbox-dark": {
                "C": "#ebdbb2",
                "O": "#cc241d",
                "N": "#458588",
                "F": "#98971a",
                "CL": "#b8bb26",
                "BR": "#d65d0e",
                "I": "#b16286",
                "P": "#fe8019",
                "S": "#d79921",
                "B": "#8ec07c",
                "SI": "#83a598",
                "H": "#bdae93",
                "BACKGROUND": "transparent"
            },
            "custom": {
                "C": "#222",
                "O": "#e74c3c",
                "N": "#3498db",
                "F": "#27ae60",
                "CL": "#16a085",
                "BR": "#d35400",
                "I": "#8e44ad",
                "P": "#d35400",
                "S": "#f1c40f",
                "B": "#e67e22",
                "SI": "#e67e22",
                "H": "#666",
                "BACKGROUND": "transparent"
            }
        }
    }

    const imgRef = createRef(null);
    const drawer = new SmilesDrawer.SmiDrawer(options); // options is a param
    
    useEffect(() => {
        
        drawer.draw(smiles, imgRef.current, theme);

    }, []);


    return (
        <div className={`${className} min-h-[${height}] min-w-[${width}]`}>
            <img ref={imgRef} className="w-full"/>
        </div>
    );
};