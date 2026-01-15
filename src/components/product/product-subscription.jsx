"use client";
import { useProduct } from '@shopify/hydrogen-react';
import { useState, useEffect } from 'react';

export default function ProductSubscription({ onSellingPlanChange, onSelectedPlanChange }) {
  const { product } = useProduct();
  
  const [selectedSellingPlanId, setSelectedSellingPlanId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // Check if product has subscription options
  const hasSellingPlans = product?.sellingPlanGroups?.edges?.length > 0;
  const requiresSellingPlan = product?.requiresSellingPlan;
  
  // Get all selling plans from all groups (flatten them)
  const allSellingPlans = hasSellingPlans
    ? product.sellingPlanGroups.edges.flatMap(groupEdge => 
        groupEdge.node.sellingPlans.edges.map(planEdge => ({
          ...planEdge.node,
          groupName: groupEdge.node.name
        }))
      )
    : [];
  
  // Set default selling plan if required or if there's only one option
  useEffect(() => {
    if (requiresSellingPlan && allSellingPlans.length > 0 && !selectedSellingPlanId) {
      const defaultPlan = allSellingPlans[0];
      setSelectedSellingPlanId(defaultPlan.id);
      setSelectedPlan(defaultPlan);
      onSellingPlanChange?.(defaultPlan.id);
      onSelectedPlanChange?.(defaultPlan);
    } else if (allSellingPlans.length === 1 && !selectedSellingPlanId && !requiresSellingPlan) {
      // Auto-select if only one option (but not if required, as that's handled above)
      const plan = allSellingPlans[0];
      setSelectedSellingPlanId(plan.id);
      setSelectedPlan(plan);
      onSellingPlanChange?.(plan.id);
      onSelectedPlanChange?.(plan);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSellingPlans.length, requiresSellingPlan]);
  
  if (!hasSellingPlans) {
    return null;
  }
  
  const handlePlanSelect = (planId) => {
    const plan = allSellingPlans.find(p => p.id === planId);
    setSelectedSellingPlanId(planId);
    setSelectedPlan(plan);
    onSellingPlanChange?.(planId);
    onSelectedPlanChange?.(plan);
  };
  
  const handleOneTimeSelect = () => {
    setSelectedSellingPlanId(null);
    setSelectedPlan(null);
    onSellingPlanChange?.(null);
    onSelectedPlanChange?.(null);
  };
  
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
        {/* Purchase Type Selection */}
        <div className="mb-3">
          <label className="block text-sm font-semibold text-secondary mb-2">
            {requiresSellingPlan ? 'Subscription Frequency' : 'Purchase Type'}
          </label>
          
          {!requiresSellingPlan && (
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={handleOneTimeSelect}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  !selectedSellingPlanId
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                One-time
              </button>
              <button
                type="button"
                onClick={() => {
                  if (allSellingPlans.length > 0 && !selectedSellingPlanId) {
                    handlePlanSelect(allSellingPlans[0].id);
                  }
                }}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  selectedSellingPlanId
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Subscribe
              </button>
            </div>
          )}
        </div>

        {/* Subscription Frequency Dropdown */}
        {(selectedSellingPlanId || requiresSellingPlan) && allSellingPlans.length > 0 && (
          <div>
            <label htmlFor="subscription-frequency" className="block text-sm font-medium text-gray-700 mb-2">
              Frequency
            </label>
            <select
              id="subscription-frequency"
              value={selectedSellingPlanId || ''}
              onChange={(e) => {
                const planId = e.target.value;
                if (planId) {
                  handlePlanSelect(planId);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
            >
              <option value="">Select frequency...</option>
              {allSellingPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
            {selectedSellingPlanId && (
              <p className="mt-2 text-xs text-gray-500">
                {allSellingPlans.find(p => p.id === selectedSellingPlanId)?.description || ''}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
