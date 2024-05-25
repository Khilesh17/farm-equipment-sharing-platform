import HandTool from "../assets/hand tools.png";
import Container from "../assets/containers.png";
import Irrigation from "../assets/irrigatiion.png";
import HeavyMachines from "../assets/heavy machines.png";
import LiveStock from "../assets/livestock.png";
import PestControl from "../assets/pest control.png";
import SowingTools from "../assets/sowing tools.png";

const cardsData = [
    {
        id: 1,
        path: HandTool,
        to: "hand-tools"
    },
    {
        id: 2,
        path: Container,
        to: "container"
    },
    {
        id: 3,
        path: Irrigation,
        to: "irrigation"
    },
    {
        id: 4,
        path: HeavyMachines,
        to: "heavy-machines"
    },
    {
        id: 5,
        path: LiveStock,
        to: "live-stock"
    },
    {
        id: 6,
        path: PestControl,
        to: "pest-control"
    },
    {
        id: 7,
        path: SowingTools,
        to: "sowing-tools"
    }
];

export default cardsData;
