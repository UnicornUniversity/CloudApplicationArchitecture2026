import {DAO} from "../data/DAO";

export default function Classes() {

    return (
        <select>
            {
                [
                    {
                        "id": 1,
                        "name": "Ampere"
                    },
                    {
                        "id": 2,
                        "name": "Ohm"
                    },
                    {
                        "id": 3,
                        "name": "Bohr"
                    },
                    {
                        "id": 4,
                        "name": "Angstrom"
                    }
                ].map((item) => <option value={item.id}>{item.name}</option>)
            }
        </select>
    );
}