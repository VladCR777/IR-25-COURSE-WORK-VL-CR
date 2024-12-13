import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TreeWrapper, ButtonGroup, StyledButton } from './RBT.styled';
import { RBT_all_methods } from './RedBlackTree';

const BuildTree = () => {
  const [tree] = useState(new RBT_all_methods());
  const svgRef = useRef(null);

  const renderTree = ({ nodes, links }, path = []) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
  
    const g = svg.append('g').attr('transform', 'translate(400, 50)');
  
      g.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', (d) => nodes.find((n) => n.id === d.source).pos)
      .attr('y1', (d) => nodes.find((n) => n.id === d.source).depth * 100)
      .attr('x2', (d) => nodes.find((n) => n.id === d.target).pos)
      .attr('y2', (d) => nodes.find((n) => n.id === d.target).depth * 100)
      .style('stroke', '#ccc');
  
    // Перевірка чи path є масивом перед використанням
    const validPath = Array.isArray(path) ? path : [];
  
    const pathLinks = links.filter(
      (link) => validPath.includes(link.source) && validPath.includes(link.target)
    );
  
    g.selectAll('.path-link')
      .data(pathLinks)
      .enter()
      .append('line')
      .attr('class', 'path-link')
      .attr('x1', (d) => nodes.find((n) => n.id === d.source).pos)
      .attr('y1', (d) => nodes.find((n) => n.id === d.source).depth * 100)
      .attr('x2', (d) => nodes.find((n) => n.id === d.target).pos)
      .attr('y2', (d) => nodes.find((n) => n.id === d.target).depth * 100)
      .style('stroke', 'orange');
  
    const nodeGroup = g
      .selectAll('.node-group')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node-group')
      .attr('transform', (d) => `translate(${d.pos}, ${d.depth * 100})`);
  
    nodeGroup
      .append('circle')
      .attr('class', 'node')
      .attr('r', 20)
      .style('fill', (d) =>
        validPath.includes(d.id) ? 'orange' : d.color === 'red' ? 'red' : 'black'
      );
  
    nodeGroup
      .append('text')
      .attr('dx', 0)
      .attr('dy', 5)
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-size', '12px')
      .text((d) => d.id);
  };
  
  
  const handleInsert = () => {
    const value = parseInt(prompt('Enter a value to insert:'), 10);
    if (!isNaN(value)) {
      tree.insert(value);
      const data = tree.visualize();
      renderTree(data);
    }
  };

  const handleSearch = () => {
    const value = parseInt(prompt('Enter a value to search:'), 10);
    if (!isNaN(value)) {
      const path = tree.search(value); // Переконайтеся, що це масив
      const data = tree.visualize();
      renderTree(data, path); // Передаємо path до renderTree
    }
  };
  

  const handleDelete = () => {
    const value = parseInt(prompt('Enter a value to delete:'), 10);
    if (!isNaN(value)) {
      tree.delete(value);
      const data = tree.visualize();
      renderTree(data);
    }
  };

  useEffect(() => {
    const data = tree.visualize();
    renderTree(data);
  }, [tree]);

  return (
    <TreeWrapper>
      <ButtonGroup>
        <StyledButton onClick={handleInsert}>Insert Node</StyledButton>
        <StyledButton onClick={handleSearch}>Search Node</StyledButton>
        <StyledButton onClick={handleDelete}>Delete Node</StyledButton>
      </ButtonGroup>
      <svg ref={svgRef} width={1300} height={700} style={{ border: '1px solid black' }} />
    </TreeWrapper>
  );
};

export default BuildTree;
