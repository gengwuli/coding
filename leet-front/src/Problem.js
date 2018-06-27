/** @flow */
import Immutable from 'immutable';
import * as React from 'react';

import request from 'superagent'
import  superagentCache  from  'superagent-cache';

import { AutoSizer, Table, SortDirection, SortIndicator, Column } from 'react-virtualized'

import styles from 'react-virtualized/styles.css';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/textmate';
import 'brace/mode/c_cpp'
import 'brace/mode/ruby'
import 'brace/mode/scala'
import 'brace/mode/javascript'
import 'brace/mode/python'
import 'brace/mode/mysql'

import ReactModal from 'react-modal'

export default class Problem extends React.Component {

    constructor(props) {
        super(props);
        const sortBy = 'problemId';
        const sortDirection = SortDirection.ASC;
        const sortedList = this._sortList({sortBy, sortDirection});
        superagentCache(request);

        

        this.state = {
            disableHeader: false,
            headerHeight: 30,
            height: 500,
            overscanRowCount: 10,
            rowHeight: 40,
            rowCount: 0,
            scrollToIndex: undefined,
            sortBy,
            sortDirection,
            sortedList,
            useDynamicRowHeight: false,
            problems: [],
            currentSolution: '',
            problemUrl: process.env.REACT_APP_PROBLEM_BACKEND,
            mode: 'javascript',
            showModal: false
        };

        document.addEventListener('keyup', (e) => {
            if ((e.keyCode || e.which) == 27) {
                this.setState({
                    showModal: false
                })
            }
        })

        this._getRowHeight = this._getRowHeight.bind(this);
        this._headerRenderer = this._headerRenderer.bind(this);
        this._noRowsRenderer = this._noRowsRenderer.bind(this);
        this._onRowCountChange = this._onRowCountChange.bind(this);
        this._onScrollToRowChange = this._onScrollToRowChange.bind(this);
        this._sort = this._sort.bind(this);
        this._renderSelect = this._renderSelect.bind(this);
        this._solutionRenderer = this._solutionRenderer.bind(this);
        this.onSolutionClick = this.onSolutionClick.bind(this);
        this.onClickSelect = this.onClickSelect.bind(this);
        this.onDiffClick = this.onDiffClick.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.reset = this.reset.bind(this);
        this.onSelectOptionChange = this.onSelectOptionChange.bind(this);
        this.onSelectFocus = this.onSelectFocus.bind(this);

    }

    componentDidMount() {
        request.get(this.state.problemUrl)
            .then((res) => {
                const problems = res.body
                this.setState({
                  problems: problems,
                  sortedList: Immutable.List(problems),
                  rowCount: problems.length
                });
            })
    }

    // for local testing
    // componentDidMount() {
    //     const problems = [{"problem_id":1,"title":"Two Sum","categories":"Array,Hash Table","companies":"LinkedIn,Uber,Airbnb,Facebook,Amazon,Microsoft,Apple,Yahoo,Dropbox,Bloomberg,Yelp,Adobe","frequency":"4774","solutions":[{"language":{"id":5,"name":"scala","created_at":"2018-06-25T04:50:33.797Z","updated_at":"2018-06-25T04:50:33.797Z"},"solution":"import scala.collection.mutable.HashMap\r\nobject Solution {\r\n    def twoSum(nums: Array[Int], target: Int): Array[Int] = {\r\n        val map = new HashMap[Int, Int]\r\n        for (i \u003c- 0 until nums.length) {\r\n            if (map.contains(nums(i))) { // 注意same element的定义, 是否是值相等还是同一个数\r\n                return Array(map(nums(i)), i)\r\n            }\r\n            map(target - nums(i)) = i\r\n        }\r\n        throw new IllegalArgumentException(\"No two sum solution\")\r\n    }\r\n}"},{"language":{"id":2,"name":"python","created_at":"2018-06-25T04:46:54.146Z","updated_at":"2018-06-25T04:46:54.146Z"},"solution":"class Solution(object):\n    def twoSum(self, nums, target):\n        \"\"\"\n        :type nums: List[int]\n        :type target: int\n        :rtype: List[int]\n        \"\"\"\n        map = dict()\n        for i,num in enumerate(nums):\n            if target - num in map:\n                return [map[target-num], i]\n            map[num] = i"},{"language":{"id":1,"name":"java","created_at":"2018-06-25T04:46:54.143Z","updated_at":"2018-06-25T04:46:54.143Z"},"solution":"// 可以brute force可以二分法如果排序的话                                               \npublic class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        if (nums == null || nums.length == 0) {\n            return nums;\n        }\n        Map\u003cInteger, Integer\u003e map = new HashMap\u003c\u003e();\n        for (int i = 0; i \u003c nums.length; i++) {\n            if (map.containsKey(nums[i])) {\n                return new int[] {map.get(nums[i]), i};\n            }\n            map.put(target - nums[i], i);\n        }\n        return new int[0];\n    }\n}"}],"ref":"https://leetcode.com/articles/two-sum","append":"空","url":"https://leetcode.com/problems/two-sum","difficulty":"Easy"}]
    //       this.setState({
    //         problems: problems,
    //         sortedList: Immutable.List(problems),
    //         rowCount: problems.length
    //       });
    // }

    render() {
        const {
            disableHeader,
            headerHeight,
            height,
            overscanRowCount,
            rowHeight,
            rowCount,
            scrollToIndex,
            sortBy,
            sortDirection,
            sortedList,
            useDynamicRowHeight,
        } = this.state;

        const rowGetter = ({index}) => this._getDatum(sortedList, index);

        return (
                <div>
                      <ReactModal 
                           isOpen={this.state.showModal}>
                           <AceEditor
                            mode={this.state.mode}
                            theme="textmate"
                            name="editor"
                            setOptions={{ showLineNumbers: false }}
                            value={this.state.currentSolution}
                            fontSize={16}
                            showGutter={false}
                            highlightActiveLine={false}
                            readOnly={true}
                            width={"auto"}
                          />
                        </ReactModal>
                        
                      <div>
                        <input type="text" placeholder="search id" onKeyUp={this.onSearch}/>
                        <input type="text" placeholder="search title"  onKeyUp={this.onSearch}/>
                        <button onClick={this.reset}>reset</button>
                      </div>
                    <AutoSizer disableHeight>
                        {({width}) => (
                            <Table
                                ref="Table"
                                disableHeader={disableHeader}
                                headerClassName={styles.headerColumn}
                                headerHeight={headerHeight}
                                height={height}
                                noRowsRenderer={this._noRowsRenderer}
                                overscanRowCount={this.state.overscanRowCount}
                                rowClassName={this._rowClassName}
                                rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
                                rowGetter={rowGetter}
                                rowCount={rowCount}
                                scrollToIndex={scrollToIndex}
                                sort={this._sort}
                                sortBy={sortBy}
                                sortDirection={sortDirection}
                                width={width}>
                                <Column
                                    width={50}
                                    label="#"
                                    dataKey="problem_id"
                                    cellRenderer={({cellData}) => cellData}
                                    flexGrow={1}
                                />
                                <Column
                                    width={500}
                                    disableSort
                                    label="标题"
                                    dataKey="title"
                                    cellRenderer={({cellData, rowData}) => (<a href={rowData.url}>{cellData}</a>)}
                                    flexGrow={2}
                                />

                                <Column
                                    width={240}
                                    disableSort
                                    label="类别"
                                    dataKey="categories"
                                    cellRenderer={this._renderSelect}
                                    flexGrow={1}
                                />

                                <Column
                                    width={150}
                                    disableSort
                                    label="公司"
                                    dataKey="companies"
                                    cellRenderer={this._renderSelect}
                                    flexGrow={1}
                                />

                                <Column
                                    width={50}
                                    label="频率"
                                    dataKey="frequency"
                                    cellRenderer={({cellData}) => cellData}
                                    flexGrow={1}
                                />

                                <Column
                                    width={50}
                                    disableSort
                                    label="参考"
                                    dataKey="ref"
                                    cellRenderer={({cellData}) => (<a href={cellData}>参考</a>)}
                                    flexGrow={1}
                                />    

                                 <Column
                                    width={100}
                                    disableSort
                                    label="难度"
                                    dataKey="difficulty"
                                    cellRenderer={({cellData}) => (<button onClick={(e) => this.onDiffClick(e,cellData)}>{cellData}</button>)}
                                    flexGrow={1}
                                />

                                <Column
                                    width={210}
                                    disableSort
                                    label="解法"
                                    dataKey="solutions"
                                    cellRenderer={this._solutionRenderer}
                                    flexGrow={1}
                                />
                            </Table>
                        )}
                    </AutoSizer>
                    <hr/>
                </div>
        );
    }

    _getDatum(list, index) {
        return list.get(index % list.size);
    }

    _getRowHeight({index}) {
        const list = this.state.problems
        return this._getDatum(list, index).size;
    }

    _headerRenderer({dataKey, sortBy, sortDirection}) {
        return (
            <div>
                Full Name
                {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
            </div>
        );
    }

    _isSortEnabled() {
        const list = this.state.problems
        const {rowCount} = this.state;

        return rowCount <= list.size;
    }

    _noRowsRenderer() {
        return <div className={styles.noRows}>No rows</div>;
    }

    _onRowCountChange(event) {
        const rowCount = parseInt(event.target.value, 10) || 0;

        this.setState({rowCount});
    }

    _onScrollToRowChange(event) {
        const {rowCount} = this.state;
        let scrollToIndex = Math.min(
            rowCount - 1,
            parseInt(event.target.value, 10),
        );

        if (isNaN(scrollToIndex)) {
            scrollToIndex = undefined;
        }

        this.setState({scrollToIndex});
    }

    _sort({sortBy, sortDirection}) {
        const sortedList = this._sortList({sortBy, sortDirection});

        this.setState({sortBy, sortDirection, sortedList});
    }

    _sortList({sortBy, sortDirection}) {
        if (this.state === undefined || this.state.problems === undefined) {return Immutable.List()}
        const list = Immutable.List(this.state.problems);

        return list
            .sortBy(item => item[sortBy])
            .update(
                list => (sortDirection === SortDirection.DESC ? list.reverse() : list),
            );
    }

    _updateUseDynamicRowHeight(value) {
        this.setState({
            useDynamicRowHeight: value,
        });
    }

    _renderSelect({cellData, rowData, dataKey}) {
      const comps = cellData.split(",");
      const opts = comps.map((c) => {
          return (<option value={c} key={Math.random()}>{c}</option>)
      })
      return <select onChange={(f) => this.onClickSelect(f, dataKey)} onFocus={this.onSelectFocus}>{opts}</select>
    }

    _solutionRenderer({cellData, rowData}) {
      if (cellData.length === 0) { return (<div>no solution</div>)}
      const btns = cellData.map((d) => {
        return <option key={Math.random()} onClick={(f) => this.onSolutionClick(f, d)}>{d.language.name}</option>
      })
      return (<select onChange={this.onSelectOptionChange} onFocus={this.onSelectFocus}>{btns}</select>)
    }

    onSelectOptionChange(e) {
        e.target.options[e.target.selectedIndex].click();
    }

    onSelectFocus(e) {
        e.target.selectedIndex = -1;
    }

    onSolutionClick(e, d) {
        console.log(d.language.name)
      this.setState({
        currentSolution: d.solution,
        mode: d.language.name,
        showModal: true
      })
    }

    onClickSelect(e, dataKey) {
      const whichOne = e.target.value;
      if (dataKey === 'categories') {
        this.setState({
          sortedList: Immutable.List(this.state.problems).filter(x => x.categories.indexOf(whichOne) !== -1)
        });
      } else if (dataKey === 'companies') {
        this.setState({
          sortedList: Immutable.List(this.state.problems).filter(x => x.companies.indexOf(whichOne) !== -1)
        })
      }

      
      this.setState({
        rowCount: this.state.sortedList.size
      })
    }

    onDiffClick(e, diff) {
      this.setState({
        sortedList: Immutable.List(this.state.problems).filter(x => x.difficulty === diff)
      });
    }

    onSearch(e) {
      if (e.keyCode !== 13) { return; }
      let res = this.state.sortedList
      if (e.target.placeholder === 'search title') {
        res = Immutable.List(this.state.problems).filter(x => x.title.toLowerCase().indexOf(e.target.value) !== -1);
        
      } else if (e.target.placeholder === 'search id') {
        res = Immutable.List(this.state.problems).filter(x => x.problem_id.toString().indexOf(e.target.value) !== -1)
      }
      this.setState({
        rowCount: res.size,
        sortedList: res
      });
      e.target.value = ''
    }

    reset() {
      this.setState ({
        sortedList: Immutable.List(this.state.problems),
        rowCount: this.state.problems.length
      })
    }
}
