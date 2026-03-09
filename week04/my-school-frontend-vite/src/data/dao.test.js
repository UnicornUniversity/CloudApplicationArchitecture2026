import {DAO} from "./DAO.js";
import {expect, test} from '@jest/globals';

test("DAO read classes", async () => {
    const dao = new DAO();
    const classes = await dao.readClasses();
    expect(classes.length).toBe(4);
});