import { Point2 } from './point2';
import { Polygon3 } from './polygon3';
import { Transform3 } from './transform3';

export class Polygon2 {
    public Vertices = new Array<Point2>();
    public Holes = new Array<Polygon2>();
}
