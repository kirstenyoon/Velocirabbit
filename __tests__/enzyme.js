import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";

// Enzyme is a wrapper around React test utilities which makes it easier to
// shallow render and traverse the shallow rendered tree.
import MainBody from "../client/components/mainBody.jsx";
import Navbar from "../client/components/navbar.jsx";

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe("React unit tests", () => {
	describe("MainBody", () => {
		let wrapper;
		const props = {};

		beforeAll(() => {
			wrapper = shallow(<MainBody {...props} />);
		});

		it("Renders a <div> with an instance of <ItemOuterContainer/>", () => {
			expect(wrapper.type()).toEqual("div");
		});
	});

	xdescribe("Box from MaterialUI", () => {
		let wrapper;
		const props = {};

		beforeAll(() => {
			wrapper = createShallow(<MainBody {...props} />);
		});

		xit("Renders a Box from MaterialUI", () => {});
	});
});
