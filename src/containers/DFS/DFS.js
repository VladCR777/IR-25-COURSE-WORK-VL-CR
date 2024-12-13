import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {
  Container,
  Sidebar,
  Title,
  TextArea,
  ButtonContainer,
  Button,
  InfoSection,
  InfoTitle,
  InfoContent,
  GraphCanvas,
} from './DFS.styled';

const DfsAlg = () => {
  const [adjList, setAdjList] = useState({});
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [visited, setVisited] = useState({});
  const [dfsRunning, setDfsRunning] = useState(false);
  const [currentVertex, setCurrentVertex] = useState(null);
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [stack, setStack] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [history, setHistory] = useState([]);
  const svgRef = useRef(null);

  const handleInputChange = (e) => {
    const input = e.target.value;
    const list = {};
    const edgesList = [];
    const verticesSet = new Set();

    input.split('\n').forEach((line) => {
      const [vertex, neighbors] = line.split(':');
      const trimmedVertex = vertex.trim();
      const trimmedNeighbors = neighbors ? neighbors.trim().split(',').map((n) => n.trim()) : [];
      list[trimmedVertex] = trimmedNeighbors;
      verticesSet.add(trimmedVertex);
      trimmedNeighbors.forEach((n) => {
        verticesSet.add(n);
        edgesList.push({ source: trimmedVertex, target: n });
      });
    });

    setAdjList(list);
    setNodes(Array.from(verticesSet).map((id) => ({ id })));
    setLinks(edgesList);
    setVisited({});
    setTraversalOrder([]);
    setStack([]);
    setHistory([]);
  };

  const resetDFS = () => {
    setDfsRunning(false);
    setVisited({});
    setCurrentVertex(null);
    setTraversalOrder([]);
    setStack([]);
    clearInterval(intervalId);
    setIntervalId(null);
    setHistory([]);
    d3.select(svgRef.current).selectAll('line').style('stroke', '#999');
    d3.select(svgRef.current).selectAll('circle').style('fill', 'black');
  };

  const startDFS = () => {
    if (dfsRunning) return;

    setDfsRunning(true);

    const dfsTraversal = () => {
      const stack = [Object.keys(adjList)[0]];
      const result = [];
      const visitedSet = new Set();

      setStack([...stack]);

      const interval = setInterval(() => {
        if (stack.length === 0) {
          clearInterval(interval);
          setDfsRunning(false);
          alert('Обхід завершено :)');
          return;
        }

        const vertex = stack.pop();
        setStack([...stack]);
        setCurrentVertex(vertex);

        if (!visitedSet.has(vertex)) {
          const newVisited = { ...visited, [vertex]: true };
          const newTraversalOrder = [...result, vertex];

          visitedSet.add(vertex);
          result.push(vertex);
          setVisited(newVisited);
          setTraversalOrder(newTraversalOrder);

          setHistory((prevHistory) => [
            ...prevHistory,
            { stack: [...stack], visited: { ...newVisited }, traversalOrder: [...newTraversalOrder], currentVertex: vertex },
          ]);

          d3.select(svgRef.current).select(`#node-${vertex}`).style('fill', 'green');

          if (adjList[vertex]) {
            for (let i = adjList[vertex].length - 1; i >= 0; i--) {
              let neighbor = adjList[vertex][i];
              stack.push(neighbor);
              if (!visited[neighbor]) {
                d3.select(svgRef.current).select(`#edge-${vertex}-${neighbor}`).style('stroke', 'green');
              }
            }
          }
          setStack([...stack]);
        }
      }, 2000);

      setIntervalId(interval);
    };

    dfsTraversal();
  };

  const pauseDFS = () => {
    setDfsRunning(false);
    clearInterval(intervalId);
  };

  const stepBack = () => {
    if (history.length > 0) {
      pauseDFS();
      const lastState = history.pop();
      setStack(lastState.stack);
      setTraversalOrder(lastState.traversalOrder);
      setCurrentVertex(lastState.currentVertex);
      setVisited(lastState.visited);
      setHistory([...history]);
      d3.select(svgRef.current).selectAll('line').style('stroke', '#999');
      d3.select(svgRef.current).selectAll('circle').style('fill', 'black');

      Object.keys(lastState.visited).forEach((vertex) => {
        d3.select(svgRef.current).select(`#node-${vertex}`).style('fill', 'green');
      });

      lastState.traversalOrder.forEach((vertex, index) => {
        if (index > 0) {
          const prevVertex = lastState.traversalOrder[index - 1];
          d3.select(svgRef.current).select(`#edge-${prevVertex}-${vertex}`).style('stroke', 'green');
        }
      });
    }
  };

  const sortTraversalOrder = (order) => {
    return [...order].sort((a, b) => {
      if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b); 
      }
      return a - b; 
    });
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.selectAll('*').remove();

    const width = 1000;
    const height = 600;

    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 21)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 7)
      .attr('markerHeight', 7)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#999')
      .style('stroke', 'none');

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(20))
      .on('tick', ticked);

    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('id', (d) => `edge-${d.source.id}-${d.target.id}`)
      .attr('stroke-width', 1.5)
      .attr('marker-end', 'url(#arrowhead)');

    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('id', (d) => `node-${d.id}`)
      .attr('r', 15)
      .attr('fill', 'black')
      .call(drag(simulation));

    node.append('title').text((d) => d.id);

    const label = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .style('fill', '#fff')
      .text((d) => d.id);

    function ticked() {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y);

      label
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y);
    }

    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  }, [nodes, links]);

  return (
    <Container>
      <Sidebar>
        <Title>DFS Algorithm Visualization</Title>
        <TextArea
          rows="5"
          placeholder="Write AdjList, for example,  A: B, C  (enter)   B: D, A  (enter) C: K... "
          onChange={handleInputChange}
        />
        <ButtonContainer>
          <Button onClick={startDFS}>Start DFS</Button>
          <Button onClick={pauseDFS}>Pause</Button>
          <Button onClick={stepBack}>Back</Button>
          <Button onClick={resetDFS}>Reset</Button>
        </ButtonContainer>
        <InfoSection>
          <InfoTitle>Current Vertex:</InfoTitle>
          <InfoContent>{currentVertex}</InfoContent>
        </InfoSection>
        <InfoSection>
          <InfoTitle>Traversal Order:</InfoTitle>
          <InfoContent>{traversalOrder?.join(', ') || 'None'}</InfoContent>
        </InfoSection>
        <InfoSection>
          <InfoTitle>Stack:</InfoTitle>
          <InfoContent>{stack.join(', ')}</InfoContent>
        </InfoSection>

        <InfoSection>
          <InfoTitle>Visited Nodes:</InfoTitle>
          <InfoContent> 
              {sortTraversalOrder(traversalOrder).join(', ') || 'None'} 
        </InfoContent>
        </InfoSection>
      </Sidebar>
      <GraphCanvas ref={svgRef} />
    </Container>
  );
};

export default DfsAlg;
