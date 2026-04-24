import { useState, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ChevronRight } from "lucide-react";
import workorderImage from "figma:asset/18db17d5823f9eff4d87c2065ee9a963c733c64b.png";

interface WorkorderManagerPageProps {
  showTopBar?: boolean;
  onBack?: () => void;
}

interface WorkOrder {
  id: string;
  title: string;
  workOrderId: string;
  description: string;
}

interface Column {
  id: string;
  title: string;
  workOrders: WorkOrder[];
}

const ITEM_TYPE = "WORKORDER";

// Initial data
const initialColumns: Column[] = [
  {
    id: "open",
    title: "OPEN",
    workOrders: [
      {
        id: "wo-1",
        title: "Inspect pump P-101",
        workOrderId: "WO-301",
        description: "Annual inspection",
      },
      {
        id: "wo-2",
        title: "Service motor M-12 on asset r001",
        workOrderId: "WO-304",
        description: "Unexpected vibration detected",
      },
    ],
  },
  {
    id: "in-progress",
    title: "IN PROGRESS",
    workOrders: [
      {
        id: "wo-3",
        title: "Replace valve V-204 on asset r001",
        workOrderId: "WO-302",
        description: "Recurring leaking valve — third time this quarter",
      },
      {
        id: "wo-4",
        title: "Calibrate sensor S-301",
        workOrderId: "WO-303",
        description: "",
      },
      {
        id: "wo-5",
        title: "Fix conveyor belt",
        workOrderId: "WO-308",
        description: "",
      },
    ],
  },
  {
    id: "completed",
    title: "COMPLETED",
    workOrders: [
      {
        id: "wo-6",
        title: "Pressure relief check on asset r001",
        workOrderId: "WO-005",
        description: "Overpressure alarm triggered",
      },
      {
        id: "wo-7",
        title: "Emergency shutdown on asset r001",
        workOrderId: "WO-307",
        description: "Coolant failure — fourth incident",
      },
    ],
  },
  {
    id: "cancelled",
    title: "CANCELLED",
    workOrders: [
      {
        id: "wo-8",
        title: "Update safety signage",
        workOrderId: "WO-008",
        description: "",
      },
    ],
  },
];

interface DragItem {
  id: string;
  sourceColumnId: string;
  index: number;
}

function WorkOrderCard({ workOrder, index, columnId }: { workOrder: WorkOrder; index: number; columnId: string }) {
  const [{ isDragging }, drag] = useDrag<DragItem, unknown, { isDragging: boolean }>({
    type: ITEM_TYPE,
    item: { id: workOrder.id, sourceColumnId: columnId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-white rounded-[6px] p-[12px] border border-[rgba(0,0,0,0.1)] cursor-move hover:shadow-md transition-shadow ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <h4 className="font-sans font-semibold text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px] mb-[4px]">
        {workOrder.title}
      </h4>
      <p className="font-sans font-normal text-[12px] leading-[16px] text-[#6E5CE6] tracking-[-0.024px] mb-[4px]">
        {workOrder.workOrderId}
      </p>
      {workOrder.description && (
        <p className="font-sans font-normal text-[12px] leading-[16px] text-[#5e666d] tracking-[-0.024px]">
          {workOrder.description}
        </p>
      )}
    </div>
  );
}

function ColumnComponent({
  column,
  onDrop,
}: {
  column: Column;
  onDrop: (workOrderId: string, targetColumnId: string, targetIndex: number) => void;
}) {
  const [{ isOver }, drop] = useDrop<DragItem, unknown, { isOver: boolean }>({
    accept: ITEM_TYPE,
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        onDrop(item.id, column.id, column.workOrders.length);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  const getBgColor = () => {
    if (column.id === "open") return "#F5F7FA";
    if (column.id === "in-progress") return "#EEF2FF";
    if (column.id === "completed") return "#F0FDF4";
    if (column.id === "cancelled") return "#FEF2F2";
    return "#F5F7FA";
  };

  return (
    <div
      ref={drop}
      className={`flex flex-col min-h-[400px] rounded-[8px] p-[16px] transition-colors ${
        isOver ? "ring-2 ring-[#6E5CE6]" : ""
      }`}
      style={{ backgroundColor: getBgColor() }}
    >
      <h3 className="font-sans font-semibold text-[12px] leading-[16px] text-[#5e666d] tracking-[0.5px] uppercase mb-[12px]">
        {column.title}
      </h3>
      <div className="flex flex-col gap-[12px]">
        {column.workOrders.map((workOrder, index) => (
          <WorkOrderCard key={workOrder.id} workOrder={workOrder} index={index} columnId={column.id} />
        ))}
      </div>
    </div>
  );
}

function WorkorderManagerTopBar({ onBack }: { onBack?: () => void }) {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Contents">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[20px] py-[12px] relative w-full">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full min-h-[36px]" data-name="Top section">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="Heading">
            {/* Breadcrumbs */}
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Breadcrumbs">
              <button
                onClick={onBack}
                className="font-sans font-normal text-[14px] leading-[20px] text-[rgba(0,0,0,0.7)] tracking-[-0.084px] hover:text-[rgba(0,0,0,0.9)] transition-colors cursor-pointer"
                style={{ fontFeatureSettings: "'ss04'" }}
              >
                Custom apps
              </button>
              <ChevronRight className="w-[14px] h-[14px] text-[#d9d9d9]" />
              <p className="font-sans font-normal text-[14px] leading-[20px] text-[rgba(0,0,0,0.9)] tracking-[-0.084px]" style={{ fontFeatureSettings: "'ss04'" }}>
                Workorder Manager
              </p>
            </div>
          </div>
          <button className="flex items-center gap-[8px] px-[16px] py-[8px] bg-[#6E5CE6] hover:bg-[#5B4BC4] text-white rounded-[8px] transition-colors">
            <span className="font-sans font-medium text-[14px] leading-[18px] tracking-[-0.04px]">
              Open Plan
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function WorkorderManagerPage({ showTopBar = true, onBack }: WorkorderManagerPageProps) {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const handleDrop = useCallback((workOrderId: string, targetColumnId: string, targetIndex: number) => {
    setColumns((prevColumns) => {
      // Find the work order in all columns
      let workOrderToMove: WorkOrder | null = null;
      let sourceColumnId: string | null = null;

      const newColumns = prevColumns.map((col) => {
        const workOrderIndex = col.workOrders.findIndex((wo) => wo.id === workOrderId);
        if (workOrderIndex !== -1) {
          workOrderToMove = col.workOrders[workOrderIndex];
          sourceColumnId = col.id;
          return {
            ...col,
            workOrders: col.workOrders.filter((wo) => wo.id !== workOrderId),
          };
        }
        return col;
      });

      // If we found the work order and it's moving to a different column
      if (workOrderToMove && sourceColumnId !== targetColumnId) {
        return newColumns.map((col) => {
          if (col.id === targetColumnId) {
            const newWorkOrders = [...col.workOrders];
            newWorkOrders.splice(targetIndex, 0, workOrderToMove!);
            return {
              ...col,
              workOrders: newWorkOrders,
            };
          }
          return col;
        });
      }

      return prevColumns;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white flex flex-col h-full w-full overflow-hidden">
        {/* Top Bar */}
        {showTopBar && <WorkorderManagerTopBar onBack={onBack} />}

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="px-[20px] py-[24px]">
            {/* AI Summary Section */}
            <div className="mb-[24px] bg-[#F5F7FA] rounded-[8px] p-[16px] border border-[rgba(0,0,0,0.08)]">
              <h2 className="font-sans font-semibold text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px] mb-[8px]">
                AI Summary
              </h2>
              <p className="font-sans font-normal text-[13px] leading-[20px] text-[#5e666d] tracking-[-0.026px]">
                Work order analysis complete. Over the past 30 days, 14 work orders have been created across the facility. Asset r001 stands out as a significant bad actor — it accounts for 4 of the last 7 completed and in-progress work orders, including two emergency shutdowns. The leaking valve issue went on the primary focus as it happened three times. Recommend escalating to a root-cause analysis and reviewing its asset's maintenance history before the next planned service window. All other assets are operating within expected maintenance frequency.
              </p>
              <button className="mt-[8px] font-sans font-medium text-[13px] leading-[18px] text-[#6E5CE6] hover:underline tracking-[-0.026px]">
                I'd like to send it to the AI agent.
              </button>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]">
              {columns.map((column) => (
                <ColumnComponent key={column.id} column={column} onDrop={handleDrop} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export { WorkorderManagerTopBar };