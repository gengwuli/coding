/** @flow */
import Immutable from 'immutable';
import * as React from 'react';

import request from 'superagent'

import { AutoSizer, Table, SortDirection, SortIndicator, Column } from 'react-virtualized'

import styles from 'react-virtualized/styles.css';

export default class Problem extends React.Component {

    constructor(props) {
        super(props);
        const sortBy = 'problemId';
        const sortDirection = SortDirection.ASC;
        const sortedList = this._sortList({sortBy, sortDirection});

        this.state = {
            disableHeader: false,
            headerHeight: 30,
            height: 400,
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
            problemUrl: process.env.REACT_APP_PROBLEM_BACKEND
        };

        this._getRowHeight = this._getRowHeight.bind(this);
        this._headerRenderer = this._headerRenderer.bind(this);
        this._noRowsRenderer = this._noRowsRenderer.bind(this);
        this._onRowCountChange = this._onRowCountChange.bind(this);
        this._onScrollToRowChange = this._onScrollToRowChange.bind(this);
        this._sort = this._sort.bind(this);
        this._renderSelect = this._renderSelect.bind(this);
        this._solutionRenderer = this._solutionRenderer.bind(this);
        this.onSolutionClick = this.onSolutionClick.bind(this);
        this.onModalClick = this.onModalClick.bind(this);
        this.onClickSelect = this.onClickSelect.bind(this);
        this.onDiffClick = this.onDiffClick.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        request.get(this.state.problemUrl)
            .then((res) => {
              this.setState({
                problems: res.body,
                sortedList: Immutable.List(res.body),
                rowCount: res.body.length
              });
            })
    }

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
                      <div id="id01" className="w3-modal">
                        <div className="w3-modal-content">
                          <div className="w3-container">
                            <span className="w3-button w3-display-topright" onClick={this.onModalClick}>&times;</span>
                            <pre>{this.state.currentSolution}</pre>
                          </div>
                        </div>
                      </div>
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
      return <select onChange={(f) => this.onClickSelect(f, dataKey)}>{opts}</select>
    }

    _solutionRenderer({cellData, rowData}) {
      if (cellData.length === 0) { return (<div>no solution</div>)}
      const btns = cellData.map((d) => {
        return <button key={Math.random()} onClick={(f) => this.onSolutionClick(f, d)}>{d.language.name}</button>
      })
      return (<div>{btns}</div>)
    }

    onSolutionClick(e, d) {
      this.setState({
        currentSolution: d.solution
      })
      document.getElementById("id01").style.display = 'block';
    }

    onModalClick() {
      document.getElementById('id01').style.display='none'
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
        res = Immutable.List(this.state.problems).filter(x => x.problemId.toString().indexOf(e.target.value) !== -1)
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
