import Dropdown from "./Dropdown";
import Option from "./Option";
import Search from "./Search";
import Select from "./Select";
import List from "./List";

/**
 * <Dropdown>
 *    <Dropdown.Select/>
 *    <Dropdown.List >
 *       <Dropdown.Option/>
 *    </Dropdown.List>
 * </Dropdown>
 */

Dropdown.Select = Select;
Dropdown.List = List;
Dropdown.Option = Option;
Dropdown.Search = Search;

export { Dropdown };
